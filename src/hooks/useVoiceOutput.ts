"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseVoiceOutputOptions {
  onPlaybackEnd?: () => void;
}

interface UseVoiceOutputReturn {
  isPlaying: boolean;
  voiceOutputEnabled: boolean;
  setVoiceOutputEnabled: (enabled: boolean) => void;
  speakText: (text: string) => Promise<void>;
  stopPlayback: () => void;
}

const LS_KEY = "outpace-voice-output";

export function useVoiceOutput(options?: UseVoiceOutputOptions): UseVoiceOutputReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabledState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const onPlaybackEndRef = useRef(options?.onPlaybackEnd);
  onPlaybackEndRef.current = options?.onPlaybackEnd;

  // Load preference from localStorage (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored === "true") setVoiceOutputEnabledState(true);
    } catch {}
  }, []);

  const setVoiceOutputEnabled = useCallback((enabled: boolean) => {
    setVoiceOutputEnabledState(enabled);
    try { localStorage.setItem(LS_KEY, String(enabled)); } catch {}
  }, []);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const speakText = useCallback(
    async (text: string) => {
      if (!voiceOutputEnabled || !text.trim()) return;

      // Stop any current playback
      stopPlayback();

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) {
          console.error("TTS fetch failed:", res.status);
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(url);
          urlRef.current = null;
          audioRef.current = null;
          onPlaybackEndRef.current?.();
        };
        audio.onerror = () => {
          console.error("Audio playback error");
          setIsPlaying(false);
          URL.revokeObjectURL(url);
          urlRef.current = null;
          audioRef.current = null;
        };

        await audio.play();
      } catch (err) {
        console.error("speakText error:", err);
        setIsPlaying(false);
      }
    },
    [voiceOutputEnabled, stopPlayback]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying,
    voiceOutputEnabled,
    setVoiceOutputEnabled,
    speakText,
    stopPlayback,
  };
}
