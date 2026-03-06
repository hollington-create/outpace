"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseVoiceInputOptions {
  onTranscript: (text: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
  language?: string;
}

interface UseVoiceInputReturn {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  interimTranscript: string;
  error: string | null;
}

const ERROR_MAP: Record<string, string> = {
  "not-allowed": "Microphone access denied. Please allow mic access in your browser settings.",
  "no-speech": "No speech detected — try again.",
  "audio-capture": "No microphone found. Please check your device.",
  "network": "Network error — check your connection.",
  "aborted": "",
};

export function useVoiceInput({
  onTranscript,
  onError,
  onEnd,
  language = "en-IE",
}: UseVoiceInputOptions): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  const onErrorRef = useRef(onError);
  const onEndRef = useRef(onEnd);
  const stoppedExplicitlyRef = useRef(false);

  // Keep callback refs current
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
    onErrorRef.current = onError;
    onEndRef.current = onEnd;
  }, [onTranscript, onError, onEnd]);

  // Feature detection (client-side only)
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SR);
  }, []);

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    // Clean up any existing instance
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }

    stoppedExplicitlyRef.current = false;

    const recognition = new SR();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setInterimTranscript("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // Reject low-confidence results (phantom recognition from ambient noise)
          const confidence = result[0].confidence;
          if (confidence > 0 && confidence < 0.65) continue;
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (interim) setInterimTranscript(interim);

      if (final.trim() && final.trim().length > 1) {
        setInterimTranscript("");
        onTranscriptRef.current(final.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Suppress no-speech — onend will fire and the caller can auto-restart
      if (event.error === "no-speech") return;

      const msg = ERROR_MAP[event.error] ?? `Speech recognition error: ${event.error}`;
      if (msg) {
        setError(msg);
        onErrorRef.current?.(msg);
      }
      setIsListening(false);
      setInterimTranscript("");
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!stoppedExplicitlyRef.current) {
        onEndRef.current?.();
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setError("Failed to start speech recognition.");
      setIsListening(false);
    }
  }, [language]);

  const stopListening = useCallback(() => {
    stoppedExplicitlyRef.current = true;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);
    setInterimTranscript("");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    interimTranscript,
    error,
  };
}
