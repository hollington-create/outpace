"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import type { ExtractedConsultationData } from "@/lib/types";
import { createEmptyExtractedData } from "@/lib/consultation-defaults";

interface DiscoveryChatProps {
  slug?: string;
}

export default function DiscoveryChat({ slug }: DiscoveryChatProps) {
  const [extractedData, setExtractedData] =
    useState<ExtractedConsultationData>(createEmptyExtractedData());
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const extractedDataRef = useRef(extractedData);
  extractedDataRef.current = extractedData;

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
    onToolCall: async ({ toolCall }: { toolCall: { toolName: string; result?: unknown } }) => {
      if (toolCall.toolName === "updateConsultationData" && toolCall.result) {
        const result = toolCall.result as {
          success: boolean;
          data: ExtractedConsultationData;
        };
        if (result?.success && result?.data) {
          setExtractedData(result.data);
        }
      }
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input after streaming completes
  useEffect(() => {
    if (status === "ready" && started) {
      inputRef.current?.focus();
    }
  }, [status, started]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || status !== "ready") return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  // Progress calculation
  const stageProgress: Record<string, number> = {
    opening: 15, branch_detection: 30,
    lead_generation: 55, digital_presence: 55,
    systems_operations: 55, client_retention: 55,
    content_brand: 55, closing: 80, complete: 100,
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

  // ── Pre-start state ──
  if (!started) {
    return (
      <div className="bg-[#0d1525] border border-slate-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-3">
          Ready for your free growth consultation?
        </h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Our AI consultant will ask you a few questions about your business and
          identify specific growth opportunities. Takes about 10 minutes.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25"
        >
          Start consultation →
        </button>
        <p className="text-slate-600 text-xs mt-4">
          No sign-up required · Completely free · Proposal within 24 hours
        </p>
      </div>
    );
  }

  // ── Active chat ──
  return (
    <div className="flex flex-col h-[650px] max-h-[75vh] bg-[#0d1525] border border-slate-800 rounded-2xl overflow-hidden">
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
            <p className="text-white font-semibold text-sm">Growth Consultant</p>
            <p className="text-slate-500 text-xs">
              {stageLabels[extractedData.currentStage] ?? "Outpace Discovery"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-500 text-xs font-mono">{progress}%</span>
          </div>
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
                <span className="text-slate-300 font-medium">{extractedData.company.name}</span>
              </div>
            )}
            {extractedData.company.industry && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Industry:</span>
                <span className="text-slate-300">{extractedData.company.industry}</span>
              </div>
            )}
            {extractedData.company.employeeCount && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Team:</span>
                <span className="text-slate-300">{extractedData.company.employeeCount}</span>
              </div>
            )}
            {extractedData.company.annualRevenue && (
              <div className="flex gap-2">
                <span className="text-slate-500 shrink-0">Revenue:</span>
                <span className="text-slate-300">{extractedData.company.annualRevenue}</span>
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
                <span className={`font-bold ${
                  extractedData.qualification.qualificationScore >= 70
                    ? "text-emerald-400"
                    : extractedData.qualification.qualificationScore >= 40
                      ? "text-amber-400"
                      : "text-slate-400"
                }`}>
                  {extractedData.qualification.qualificationScore}/100
                </span>
              </div>
            )}
          </div>
          {extractedData.keyInsights.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <p className="text-slate-500 text-xs font-medium mb-1.5">Key Insights</p>
              <ul className="space-y-1">
                {extractedData.keyInsights.map((insight, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">▸</span>{insight}
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
                we&apos;ll have a tailored proposal ready for you within 24 hours.
              </p>
              <p className="text-slate-200 text-sm leading-relaxed mt-2">
                Let&apos;s get started — tell me a bit about what your company does?
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          // Extract text content from parts
          const textParts = message.parts.filter(
            (p): p is { type: "text"; text: string } =>
              p.type === "text" &&
              "text" in p &&
              (p as { text: string }).text.trim().length > 0
          );

          // Skip messages with no visible text
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
                      message.role === "user" ? "text-cyan-100" : "text-slate-200"
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

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <form
        onSubmit={handleSend}
        className="px-6 py-4 border-t border-slate-800 flex gap-3 shrink-0"
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            extractedData.currentStage === "complete"
              ? "Consultation complete — thank you!"
              : "Type your response..."
          }
          disabled={status !== "ready" || extractedData.currentStage === "complete"}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || status !== "ready" || extractedData.currentStage === "complete"}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>

      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 shrink-0">
          <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
        </div>
      )}
    </div>
  );
}
