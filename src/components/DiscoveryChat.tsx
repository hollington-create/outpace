"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import type { ExtractedConsultationData } from "@/lib/types";
import { createEmptyExtractedData } from "@/lib/consultation-defaults";
import { PAGE_CONFIGS } from "@/lib/discovery-configs";
import { Mic, Volume2, Phone, PhoneOff } from "lucide-react";

interface DiscoveryChatProps {
  slug?: string;
}

export default function DiscoveryChat({ slug }: DiscoveryChatProps) {
  const pageConfig = slug ? PAGE_CONFIGS[slug] : undefined;
  const [extractedData, setExtractedData] =
    useState<ExtractedConsultationData>(createEmptyExtractedData());
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const extractedDataRef = useRef(extractedData);
  extractedDataRef.current = extractedData;

  // ── ElevenLabs ConvAI (voice mode) ──
  const conversation = useConversation({
    onConnect: () => {
      console.log("[ConvAI] Connected");
      setVoiceError(null);
    },
    onDisconnect: (details) => {
      console.log("[ConvAI] Disconnected", details);
    },
    onError: (err: string) => {
      console.error("[ConvAI] Error:", err);
      setVoiceError("Connection error. Please try again.");
    },
    onStatusChange: (status) => {
      console.log("[ConvAI] Status:", status);
    },
    onDebug: (info) => {
      console.log("[ConvAI] Debug:", info);
    },
  });

  const isConvAIConnected = conversation.status === "connected";
  const isConvAIConnecting = conversation.status === "connecting";
  const isSpeaking = conversation.isSpeaking;

  // ── Chat transport (text mode) ──
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

  // ── Supabase: save messages (text mode only) ──
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

  // Auto-scroll within chat container (text mode only)
  useEffect(() => {
    if (!voiceMode && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, voiceMode]);

  // Focus input after streaming completes (text mode) — preventScroll stops page jumping
  useEffect(() => {
    if (status === "ready" && started && !voiceMode) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [status, started, voiceMode]);

  // ── Voice mode: start ConvAI session ──
  const [voiceConnecting, setVoiceConnecting] = useState(false);
  const [voiceStep, setVoiceStep] = useState("");

  const startVoiceSession = useCallback(async () => {
    setVoiceError(null);
    setVoiceConnecting(true);
    console.log("[ConvAI] Starting voice session...");

    // Step 1: Request mic permission explicitly BEFORE the SDK
    // (SDK's internal getUserMedia can hang if permission prompt is unresolved)
    setVoiceStep("Requesting mic access...");
    try {
      console.log("[ConvAI] Requesting mic permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately — SDK will create its own
      stream.getTracks().forEach((t) => t.stop());
      console.log("[ConvAI] Mic permission granted");
    } catch (err) {
      console.error("[ConvAI] Mic error:", err);
      setVoiceConnecting(false);
      setVoiceStep("");
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setVoiceError(
          "Microphone access denied. Please allow mic access in your browser settings."
        );
      } else if (err instanceof DOMException && err.name === "NotFoundError") {
        setVoiceError("No microphone found. Please connect a microphone.");
      } else {
        setVoiceError(
          "Could not access microphone. Please check your browser settings."
        );
      }
      return;
    }

    // Step 2: Fetch signed URL + system prompt from server
    setVoiceStep("Fetching session...");
    try {
      console.log("[ConvAI] Fetching signed URL...");
      const res = await fetch("/api/elevenlabs/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          currentData: extractedDataRef.current,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("[ConvAI] Signed URL error:", res.status, errData);
        setVoiceConnecting(false);
        setVoiceStep("");
        setVoiceError(errData.error || "Failed to start voice session");
        return;
      }

      const { signedUrl, systemPrompt, firstMessage } = await res.json();
      console.log("[ConvAI] Got signed URL:", signedUrl?.substring(0, 50) + "...");
      console.log("[ConvAI] Prompt length:", systemPrompt?.length, "firstMessage length:", firstMessage?.length);
      setVoiceStep("Connecting...");

      // Step 3: Start ConvAI session (mic already permitted)
      const sessionPromise = conversation.startSession({
        signedUrl,
        overrides: {
          agent: {
            prompt: { prompt: systemPrompt },
            firstMessage,
          },
          tts: {
            voiceId: "hmMWXCj9K7N5mCPcRkfC",
          },
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Connection timed out after 20s")), 20000)
      );

      const conversationId = await Promise.race([sessionPromise, timeoutPromise]);
      console.log("[ConvAI] Session started successfully, id:", conversationId);
      setVoiceConnecting(false);
      setVoiceStep("");
    } catch (err) {
      console.error("[ConvAI] Start error:", err);
      setVoiceConnecting(false);
      setVoiceStep("");
      const msg = err instanceof Error ? err.message : String(err);
      setVoiceError(`Failed to start conversation: ${msg}`);
    }
  }, [slug, conversation]);

  const endVoiceSession = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (err) {
      console.error("[ConvAI] End error:", err);
    }
  }, [conversation]);

  // Auto-start voice session when entering voice mode
  const voiceStartedRef = useRef(false);
  useEffect(() => {
    if (voiceMode && started && conversation.status === "disconnected" && !voiceStartedRef.current) {
      voiceStartedRef.current = true;
      startVoiceSession();
    }
    if (!voiceMode) {
      voiceStartedRef.current = false;
    }
  }, [voiceMode, started, conversation.status, startVoiceSession]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || status !== "ready") return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const toggleVoiceMode = async () => {
    if (voiceMode) {
      // Exit voice mode
      setVoiceMode(false);
      await endVoiceSession();
    } else {
      // Enter voice mode
      setVoiceMode(true);
      // startVoiceSession triggers via the useEffect above
    }
  };

  // Progress calculation
  const stageProgress: Record<string, number> = {
    opening: 10,
    branch_detection: 25,
    business_analysis: 50,
    lead_generation: 50,
    digital_presence: 50,
    systems_operations: 50,
    content_brand: 50,
    ai_growth_tools: 50,
    sales_enablement: 50,
    client_retention: 50,
    brand_positioning: 50,
    partnerships: 50,
    closing: 80,
    complete: 100,
  };
  const progress = stageProgress[extractedData.currentStage] ?? 0;

  const stageLabels: Record<string, string> = {
    opening: "Getting to know you",
    branch_detection: "Identifying challenges",
    business_analysis: "Business analysis deep-dive",
    lead_generation: "Lead generation deep-dive",
    digital_presence: "Digital presence deep-dive",
    systems_operations: "Systems & operations deep-dive",
    content_brand: "Content & video deep-dive",
    ai_growth_tools: "AI & automation deep-dive",
    sales_enablement: "Sales process deep-dive",
    client_retention: "Client retention deep-dive",
    brand_positioning: "Brand & positioning deep-dive",
    partnerships: "Partnerships & referrals deep-dive",
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
          {pageConfig?.contactName
            ? `${pageConfig.contactName}, let\u2019s talk growth`
            : "Ready for your free growth consultation?"}
        </h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          {pageConfig?.contactName
            ? "We\u2019ve done our homework on your business. A quick 10-minute conversation and our team will put together a tailored growth proposal for you."
            : "A quick 10-minute conversation about your business, and we\u2019ll put together a tailored growth proposal. No obligation."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setStarted(true);
              setVoiceMode(true);
            }}
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center gap-2 animate-ring-shake hover:animate-none"
          >
            <Phone className="w-4 h-4" />
            Start voice consultation
          </button>
          <button
            onClick={() => setStarted(true)}
            className="text-slate-400 hover:text-slate-200 font-medium px-6 py-3.5 rounded-xl transition-all duration-200 border border-slate-700/60 hover:border-slate-600 text-sm"
          >
            Prefer to type? Start text chat
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-5">
          No sign-up required &middot; Completely free &middot; Proposal within 24 hours
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
              {/* Audio playing indicator (voice mode) */}
              {isSpeaking && (
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
          <button
            onClick={toggleVoiceMode}
            disabled={isConvAIConnecting}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              voiceMode
                ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
            } disabled:opacity-50`}
            title={voiceMode ? "Exit voice mode" : "Voice mode"}
            aria-label={voiceMode ? "Exit voice mode" : "Enter voice mode"}
          >
            {voiceMode ? (
              <PhoneOff className="w-4 h-4" />
            ) : (
              <Phone className="w-4 h-4" />
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

      {/* ── Messages (text mode) ── */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Initial greeting (text mode only) */}
        {!voiceMode && messages.length === 0 && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-[10px] font-bold shrink-0">
              OP
            </div>
            <div className="bg-slate-800/50 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
              {pageConfig?.firstMessage ? (
                <p className="text-slate-200 text-sm leading-relaxed">
                  {pageConfig.firstMessage}
                </p>
              ) : (
                <>
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
                </>
              )}
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

        {/* Typing indicator (text mode) */}
        {!voiceMode && (status === "streaming" || status === "submitted") && (
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

        <div ref={messagesEndRef} />
      </div>

      {/* ── Voice Mode Overlay (ConvAI) ── */}
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

          {/* Outpace label */}
          <p className="text-slate-500 text-xs font-medium tracking-wider uppercase mb-8">
            Outpace Discovery
          </p>

          {/* Central status area */}
          <div className="relative mb-8">
            {/* Pulsing rings when listening (connected, not speaking) */}
            {isConvAIConnected && !isSpeaking && (
              <>
                <div className="absolute inset-0 -m-4 rounded-full bg-cyan-500/10 animate-ping" />
                <div className="absolute inset-0 -m-8 rounded-full bg-cyan-500/5 animate-ping [animation-delay:300ms]" />
              </>
            )}
            {/* Pulsing rings when AI is speaking */}
            {isSpeaking && (
              <>
                <div className="absolute inset-0 -m-4 rounded-full bg-violet-500/10 animate-ping" />
                <div className="absolute inset-0 -m-8 rounded-full bg-violet-500/5 animate-ping [animation-delay:300ms]" />
              </>
            )}

            <div
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isConvAIConnected && !isSpeaking
                  ? "bg-cyan-500/20 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30"
                  : isSpeaking
                    ? "bg-violet-500/20 border-2 border-violet-400 shadow-lg shadow-violet-500/30"
                    : (isConvAIConnecting || voiceConnecting)
                      ? "bg-slate-800 border-2 border-slate-600 animate-pulse"
                      : "bg-slate-800/80 border-2 border-slate-600"
              }`}
            >
              {isConvAIConnected && !isSpeaking ? (
                <Mic className="w-10 h-10 text-cyan-400" />
              ) : isSpeaking ? (
                <Volume2 className="w-10 h-10 text-violet-400" />
              ) : (isConvAIConnecting || voiceConnecting) ? (
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2.5 h-2.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              ) : (
                <Phone className="w-10 h-10 text-slate-400" />
              )}
            </div>
          </div>

          {/* Status text */}
          <p
            className={`text-sm font-medium mb-2 ${
              isConvAIConnected && !isSpeaking
                ? "text-cyan-400"
                : isSpeaking
                  ? "text-violet-400"
                  : (isConvAIConnecting || voiceConnecting)
                    ? "text-slate-400"
                    : "text-slate-500"
            }`}
          >
            {isConvAIConnected && !isSpeaking
              ? "Listening..."
              : isSpeaking
                ? "Speaking..."
                : (isConvAIConnecting || voiceConnecting)
                  ? (voiceStep || "Connecting...")
                  : voiceError
                    ? "Connection failed"
                    : "Starting..."}
          </p>

          {/* Context text */}
          <div className="px-8 text-center max-w-md min-h-[60px]">
            {isConvAIConnected ? (
              <p className="text-slate-400 text-xs leading-relaxed">
                {isSpeaking
                  ? "The consultant is speaking. Just listen and respond naturally."
                  : "Speak naturally. The consultant is listening."}
              </p>
            ) : (isConvAIConnecting || voiceConnecting) ? (
              <p className="text-slate-500 text-xs">
                Setting up your voice consultation...
              </p>
            ) : voiceError ? (
              <div className="text-center">
                <p className="text-red-400 text-xs mb-3">{voiceError}</p>
                <button
                  onClick={() => {
                    voiceStartedRef.current = false;
                    startVoiceSession();
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : null}
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-8 right-8">
            <p className="text-slate-600 text-[10px] text-center">
              Voice consultation in progress
            </p>
          </div>
        </div>
      )}

      {/* ── Input (text mode) ── */}
      <form
        onSubmit={handleSend}
        className="px-6 py-4 border-t border-slate-800 flex gap-3 shrink-0"
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            isComplete
              ? "Consultation complete — thank you!"
              : voiceMode
                ? "Voice mode active — speak naturally"
                : "Type your message..."
          }
          disabled={status !== "ready" || isComplete || voiceMode}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!inputValue.trim() || status !== "ready" || isComplete || voiceMode}
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
      {error && !voiceMode && (
        <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 shrink-0">
          <p className="text-red-400 text-xs">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
      {voiceError && voiceMode && (
        <div className="px-6 py-3 bg-amber-500/10 border-t border-amber-500/20 shrink-0">
          <p className="text-amber-400 text-xs">{voiceError}</p>
        </div>
      )}
    </div>
  );
}
