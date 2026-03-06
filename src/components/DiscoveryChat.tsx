"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { ExtractedConsultationData } from "@/lib/types";
import { createEmptyExtractedData } from "@/lib/consultation-defaults";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useVoiceOutput } from "@/hooks/useVoiceOutput";
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from "lucide-react";

interface DiscoveryChatProps {
  slug?: string;
}

export default function DiscoveryChat({ slug }: DiscoveryChatProps) {
  const [extractedData, setExtractedData] =
    useState<ExtractedConsultationData>(createEmptyExtractedData());
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const voiceModeRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const extractedDataRef = useRef(extractedData);
  extractedDataRef.current = extractedData;

  // ── Voice hooks ──
  const startListeningRef = useRef<() => void>(() => {});
  const justSentRef = useRef(false);
  const statusRef = useRef("ready");
  const isPlayingRef = useRef(false);
  const isListeningRef = useRef(false);

  const handlePlaybackEnd = useCallback(() => {
    // Auto-listen after TTS finishes in voice mode
    // 800ms delay lets speaker audio fully dissipate before mic opens (prevents feedback)
    if (voiceModeRef.current) {
      setTimeout(() => startListeningRef.current(), 800);
    }
  }, []);

  const {
    isPlaying,
    voiceOutputEnabled,
    setVoiceOutputEnabled,
    speakText,
    stopPlayback,
  } = useVoiceOutput({ onPlaybackEnd: handlePlaybackEnd });

  const handleVoiceTranscript = useCallback(
    (text: string) => {
      if (text.trim() && statusRef.current === "ready") {
        justSentRef.current = true;
        sendMessageRef.current?.({ text });
      }
    },
    []
  );

  // Auto-restart listening when recognition ends naturally in voice mode
  const handleRecognitionEnd = useCallback(() => {
    // If a message was just sent, don't restart — handlePlaybackEnd will after TTS
    if (justSentRef.current) {
      justSentRef.current = false;
      return;
    }
    // Otherwise (e.g. no-speech timeout), restart immediately
    if (voiceModeRef.current) {
      setTimeout(() => {
        if (voiceModeRef.current) {
          startListeningRef.current();
        }
      }, 300);
    }
  }, []);

  const {
    isListening,
    isSupported: micSupported,
    startListening,
    stopListening,
    interimTranscript,
    error: voiceError,
  } = useVoiceInput({
    onTranscript: handleVoiceTranscript,
    onEnd: handleRecognitionEnd,
    language: "en-GB",
  });

  // Keep refs in sync
  startListeningRef.current = startListening;
  voiceModeRef.current = voiceMode;
  isPlayingRef.current = isPlaying;
  isListeningRef.current = isListening;

  // ── Chat transport ──
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({
          currentData: extractedDataRef.current,
          slug,
        }),
      }),
    [slug]
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onToolCall: async ({
      toolCall,
    }: {
      toolCall: { toolName: string; result?: unknown };
    }) => {
      if (toolCall.toolName === "updateConsultationData" && toolCall.result) {
        const result = toolCall.result as {
          success: boolean;
          data: ExtractedConsultationData;
        };
        if (result?.success && result?.data) {
          setExtractedData(result.data);
          // Persist extracted data to Supabase
          if (consultationId) {
            fetch("/api/consultation", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                consultationId,
                extractedData: result.data,
              }),
            }).catch(console.error);
          }
        }
      }
    },
  });

  // Ref for sendMessage so voice callback stays stable
  const sendMessageRef = useRef(sendMessage);
  sendMessageRef.current = sendMessage;
  statusRef.current = status;

  // ── Supabase: create consultation on start ──
  useEffect(() => {
    if (!started || consultationId) return;
    const create = async () => {
      try {
        const res = await fetch("/api/consultation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: slug || null }),
        });
        const { consultation } = await res.json();
        if (consultation?.id) setConsultationId(consultation.id);
      } catch (err) {
        console.error("Failed to create consultation:", err);
      }
    };
    create();
  }, [started, consultationId, slug]);

  // ── Supabase: save messages ──
  const savedMessageIds = useRef(new Set<string>());
  useEffect(() => {
    if (!consultationId || status !== "ready") return;

    messages.forEach(async (msg) => {
      if (savedMessageIds.current.has(msg.id)) return;

      const textContent = msg.parts
        .filter(
          (p): p is { type: "text"; text: string } =>
            p.type === "text" && "text" in p
        )
        .map((p) => p.text)
        .join("\n");

      if (!textContent.trim()) return;
      savedMessageIds.current.add(msg.id);

      try {
        await fetch("/api/consultation/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consultationId,
            role: msg.role,
            content: textContent,
          }),
        });
      } catch (err) {
        console.error("Failed to save message:", err);
        savedMessageIds.current.delete(msg.id);
      }
    });
  }, [messages, consultationId, status]);

  // ── Stop mic when TTS starts (prevent speaker→mic feedback loop) ──
  useEffect(() => {
    if (isPlaying && isListening) {
      stopListening();
    }
  }, [isPlaying, isListening, stopListening]);

  // ── Voice output: speak new assistant messages ──
  const lastSpokenIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (status !== "ready" || !voiceOutputEnabled) return;

    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!lastAssistant || lastAssistant.id === lastSpokenIdRef.current) return;

    const textContent = lastAssistant.parts
      .filter(
        (p): p is { type: "text"; text: string } =>
          p.type === "text" && "text" in p && (p as { text: string }).text.trim().length > 0
      )
      .map((p) => p.text)
      .join(" ");

    if (textContent) {
      lastSpokenIdRef.current = lastAssistant.id;
      speakText(textContent);
    }
  }, [messages, status, voiceOutputEnabled, speakText]);

  // ── Voice mode: speak greeting on start ──
  const greetingSpokenRef = useRef(false);
  useEffect(() => {
    if (voiceMode && started && messages.length === 0 && !greetingSpokenRef.current) {
      greetingSpokenRef.current = true;
      const greeting =
        "Hi there! I'm your growth consultant from Outpace. I'd love to learn about your business and explore how we might help you grow. This'll take about 10 minutes. Let's get started — tell me a bit about what your company does?";
      speakText(greeting);
    }
  }, [voiceMode, started, messages.length, speakText]);

  // Safety net: if voice mode is on and we're idle, auto-start listening
  // Catches any gap where the TTS → handlePlaybackEnd → startListening chain breaks
  useEffect(() => {
    if (!voiceMode || status !== "ready" || isListening || isPlaying) return;

    const timer = setTimeout(() => {
      if (voiceModeRef.current && !isPlayingRef.current && !isListeningRef.current && statusRef.current === "ready") {
        startListeningRef.current();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [voiceMode, status, isListening, isPlaying]);

  // Auto-scroll to bottom (skip in voice mode — overlay covers messages)
  useEffect(() => {
    if (!voiceMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isListening, interimTranscript, voiceMode]);

  // Focus input after streaming completes
  useEffect(() => {
    if (status === "ready" && started && !isListening) {
      inputRef.current?.focus();
    }
  }, [status, started, isListening]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || status !== "ready") return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      stopPlayback(); // Interrupt any active TTS
      startListening();
    }
  };

  const toggleVoiceMode = () => {
    if (voiceMode) {
      // Exit voice mode
      setVoiceMode(false);
      stopListening();
      stopPlayback();
    } else {
      // Enter voice mode
      setVoiceMode(true);
      setVoiceOutputEnabled(true);
      // Start listening immediately if chat is ready
      if (status === "ready") {
        setTimeout(() => startListening(), 300);
      }
    }
  };

  // Progress calculation
  const stageProgress: Record<string, number> = {
    opening: 15,
    branch_detection: 30,
    lead_generation: 55,
    digital_presence: 55,
    systems_operations: 55,
    client_retention: 55,
    content_brand: 55,
    closing: 80,
    complete: 100,
  };
  const progress = stageProgress[extractedData.currentStage] ?? 0;

  const stageLabels: Record<string, string> = {
    opening: "Getting to know you",
    branch_detection: "Identifying challenges",
    lead_generation: "Lead generation deep-dive",
    digital_presence: "Digital presence deep-dive",
    systems_operations: "Systems & operations deep-dive",
    client_retention: "Client retention deep-dive",
    content_brand: "Content & brand deep-dive",
    closing: "Wrapping up",
    complete: "Consultation complete",
  };

  const formatBranch = (b: string) =>
    b.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isComplete = extractedData.currentStage === "complete";

  // ── Pre-start state ──
  if (!started) {
    return (
      <div className="bg-[#0d1525] border border-slate-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-3">
          Ready for your free growth consultation?
        </h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Our AI consultant will ask you a few questions about your business and
          identify specific growth opportunities. Takes about 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setStarted(true)}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            Start consultation →
          </button>
          {micSupported && (
            <button
              onClick={() => {
                setStarted(true);
                setVoiceMode(true);
                setVoiceOutputEnabled(true);
              }}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Voice consultation
            </button>
          )}
        </div>
        <p className="text-slate-600 text-xs mt-4">
          No sign-up required · Completely free · Proposal within 24 hours
        </p>
      </div>
    );
  }

  // ── Active chat ──
  return (
    <div className="relative flex flex-col h-[650px] max-h-[75vh] bg-[#0d1525] border border-slate-800 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              OP
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1525]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold text-sm">
                Growth Consultant
              </p>
              {/* Audio playing indicator */}
              {isPlaying && (
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  <div className="w-0.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  <div className="w-0.5 h-4 bg-cyan-400 rounded-full animate-pulse [animation-delay:150ms]" />
                  <div className="w-0.5 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:300ms]" />
                </div>
              )}
            </div>
            <p className="text-slate-500 text-xs">
              {stageLabels[extractedData.currentStage] ?? "Outpace Discovery"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-500 text-xs font-mono">
              {progress}%
            </span>
          </div>
          {/* Voice mode toggle */}
          {micSupported && (
            <button
              onClick={toggleVoiceMode}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                voiceMode
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
              title={voiceMode ? "Exit voice mode" : "Voice mode"}
              aria-label={voiceMode ? "Exit voice mode" : "Enter voice mode"}
            >
              {voiceMode ? (
                <PhoneOff className="w-4 h-4" />
              ) : (
                <Phone className="w-4 h-4" />
              )}
            </button>
          )}
          {/* Speaker toggle */}
          <button
            onClick={() => {
              if (voiceOutputEnabled) stopPlayback();
              setVoiceOutputEnabled(!voiceOutputEnabled);
            }}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              voiceOutputEnabled
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
            title={voiceOutputEnabled ? "Mute voice" : "Enable voice"}
            aria-label={voiceOutputEnabled ? "Mute voice output" : "Enable voice output"}
          >
            {voiceOutputEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          {/* Data panel toggle */}
          <button
            onClick={() => setShowDataPanel(!showDataPanel)}
            className={`text-xs px-2.5 py-1 rounded-lg transition-all duration-200 ${
              showDataPanel
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            }`}
          >
            {showDataPanel ? "✕ Hide" : "📊 Data"}
          </button>
        </div>
      </div>

      {/* ── Extracted Data Panel ── */}
      {showDataPanel && (
        <div className="px-6 py-4 border-b border-slate-800 bg-[#080d17] max-h-52 overflow-y-auto shrink-0">
          <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mb-3">
            Extracted Data
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            {extractedData.company.name && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Company:</span>
                <span className="text-slate-300 font-medium">
                  {extractedData.company.name}
                </span>
              </div>
            )}
            {extractedData.company.industry && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Industry:</span>
                <span className="text-slate-300">
                  {extractedData.company.industry}
                </span>
              </div>
            )}
            {extractedData.company.employeeCount && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Team:</span>
                <span className="text-slate-300">
                  {extractedData.company.employeeCount}
                </span>
              </div>
            )}
            {extractedData.company.annualRevenue && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Revenue:</span>
                <span className="text-slate-300">
                  {extractedData.company.annualRevenue}
                </span>
              </div>
            )}
            {extractedData.primaryPainBranch && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Primary Pain:</span>
                <span className="text-cyan-400 font-medium">
                  {formatBranch(extractedData.primaryPainBranch)}
                </span>
              </div>
            )}
            {extractedData.qualification.qualificationScore > 0 && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Score:</span>
                <span
                  className={`font-bold ${
                    extractedData.qualification.qualificationScore >= 70
                      ? "text-emerald-400"
                      : extractedData.qualification.qualificationScore >= 40
                        ? "text-amber-400"
                        : "text-slate-400"
                  }`}
                >
                  {extractedData.qualification.qualificationScore}/100
                </span>
              </div>
            )}
          </div>
          {extractedData.keyInsights.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <p className="text-slate-500 text-xs font-medium mb-1.5">
                Key Insights
              </p>
              <ul className="space-y-1">
                {extractedData.keyInsights.map((insight, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 mt-0.5">▸</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Initial greeting */}
        {messages.length === 0 && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-[10px] font-bold shrink-0">
              OP
            </div>
            <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
              <p className="text-slate-200 text-sm leading-relaxed">
                Hi there! 👋 I&apos;m your growth consultant from Outpace.
                I&apos;d love to learn about your business and explore how we
                might help you grow. This&apos;ll take about 10 minutes, and
                we&apos;ll have a tailored proposal ready for you within 24
                hours.
              </p>
              <p className="text-slate-200 text-sm leading-relaxed mt-2">
                Let&apos;s get started — tell me a bit about what your company
                does?
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const textParts = message.parts.filter(
            (p): p is { type: "text"; text: string } =>
              p.type === "text" &&
              "text" in p &&
              (p as { text: string }).text.trim().length > 0
          );

          if (textParts.length === 0) return null;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-[10px] font-bold shrink-0">
                  OP
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                  message.role === "user"
                    ? "bg-cyan-500/15 border border-cyan-500/25 rounded-tr-sm"
                    : "bg-slate-800/50 border border-slate-700/40 rounded-tl-sm"
                }`}
              >
                {textParts.map((part, i) => (
                  <p
                    key={`${message.id}-${i}`}
                    className={`text-sm leading-relaxed ${
                      message.role === "user"
                        ? "text-cyan-100"
                        : "text-slate-200"
                    }`}
                  >
                    {part.text}
                  </p>
                ))}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold shrink-0">
                  You
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {(status === "streaming" || status === "submitted") && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-[10px] font-bold shrink-0">
              OP
            </div>
            <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Listening indicator */}
        {isListening && (
          <div className="flex gap-3 justify-end">
            <div className="bg-cyan-500/15 border border-cyan-500/25 rounded-2xl rounded-tr-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-cyan-300 text-sm">
                  {interimTranscript || "Listening..."}
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-[10px] font-bold shrink-0">
              You
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Voice Mode Overlay ── */}
      {voiceMode && (
        <div className="absolute inset-0 bg-[#0d1525]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          {/* End call button */}
          <button
            onClick={toggleVoiceMode}
            className="absolute top-4 right-4 p-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
            title="End voice consultation"
          >
            <PhoneOff className="w-5 h-5" />
          </button>

          {/* Stage label */}
          <p className="text-slate-500 text-xs font-medium tracking-wider uppercase mb-8">
            {stageLabels[extractedData.currentStage] ?? "Discovery"}
          </p>

          {/* Central mic/status area */}
          <div className="relative mb-8">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 -m-4 rounded-full bg-cyan-500/10 animate-ping" />
                <div className="absolute inset-0 -m-8 rounded-full bg-cyan-500/5 animate-ping [animation-delay:300ms]" />
              </>
            )}
            {/* Pulsing rings when AI is speaking */}
            {isPlaying && (
              <>
                <div className="absolute inset-0 -m-4 rounded-full bg-violet-500/10 animate-ping" />
                <div className="absolute inset-0 -m-8 rounded-full bg-violet-500/5 animate-ping [animation-delay:300ms]" />
              </>
            )}

            <button
              onClick={handleMicToggle}
              disabled={status !== "ready" && !isListening}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? "bg-cyan-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30"
                  : isPlaying
                    ? "bg-violet-500/20 border-2 border-violet-400 shadow-lg shadow-violet-500/30"
                    : status === "streaming" || status === "submitted"
                      ? "bg-slate-800 border-2 border-slate-600"
                      : "bg-slate-800/80 border-2 border-slate-600 hover:border-cyan-500/50 hover:bg-cyan-500/10"
              } disabled:opacity-50`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 text-cyan-400" />
              ) : isPlaying ? (
                <Volume2 className="w-10 h-10 text-violet-400" />
              ) : status === "streaming" || status === "submitted" ? (
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              ) : (
                <Mic className="w-10 h-10 text-slate-400" />
              )}
            </button>
          </div>

          {/* Status text */}
          <p className={`text-sm font-medium mb-2 ${
            isListening ? "text-cyan-400" : isPlaying ? "text-violet-400" : "text-slate-400"
          }`}>
            {isListening
              ? "Listening..."
              : isPlaying
                ? "Speaking..."
                : status === "streaming" || status === "submitted"
                  ? "Thinking..."
                  : "Listening..."}
          </p>

          {/* Live transcript / last message */}
          <div className="px-8 text-center max-w-md min-h-[60px]">
            {isListening && interimTranscript ? (
              <p className="text-cyan-200 text-sm italic">&ldquo;{interimTranscript}&rdquo;</p>
            ) : (
              (() => {
                const lastMsg = [...messages].reverse().find((m) => m.role === "assistant");
                const text = lastMsg?.parts
                  .filter(
                    (p): p is { type: "text"; text: string } =>
                      p.type === "text" && "text" in p
                  )
                  .map((p) => p.text)
                  .join(" ");
                return text ? (
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{text}</p>
                ) : null;
              })()
            )}
          </div>

          {/* Progress bar at bottom */}
          <div className="absolute bottom-6 left-8 right-8">
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-slate-600 text-[10px] text-center mt-2">{progress}% complete</p>
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <form
        onSubmit={handleSend}
        className="px-6 py-4 border-t border-slate-800 flex gap-3 shrink-0"
      >
        <input
          ref={inputRef}
          value={isListening ? interimTranscript : inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isComplete
              ? "Consultation complete — thank you!"
              : isListening
                ? "Listening..."
                : "Type or tap the mic..."
          }
          disabled={status !== "ready" || isComplete || isListening}
          readOnly={isListening}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
        />

        {/* Mic button (Chrome/Edge only) */}
        {micSupported && !isComplete && (
          <button
            type="button"
            onClick={handleMicToggle}
            disabled={status !== "ready" && !isListening}
            className={`p-3 rounded-xl transition-all duration-200 shrink-0 ${
              isListening
                ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-mic-pulse"
                : "bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isListening ? "Stop recording" : "Start voice input"}
            aria-label={isListening ? "Stop recording" : "Start voice input"}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Send button */}
        <button
          type="submit"
          disabled={!inputValue.trim() || status !== "ready" || isComplete}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>

      {/* Errors */}
      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 shrink-0">
          <p className="text-red-400 text-xs">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
      {voiceError && (
        <div className="px-6 py-3 bg-amber-500/10 border-t border-amber-500/20 shrink-0">
          <p className="text-amber-400 text-xs">{voiceError}</p>
        </div>
      )}
    </div>
  );
}
