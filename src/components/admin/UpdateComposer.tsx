"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Workstream {
  id: string;
  pillar: { name: string } | null;
}

interface UpdateComposerProps {
  engagementId: string;
  workstreams?: Workstream[];
  onPost: () => void;
}

const UPDATE_TYPES = [
  { value: "general", label: "General" },
  { value: "milestone", label: "Milestone" },
  { value: "deliverable", label: "Deliverable" },
  { value: "meeting", label: "Meeting" },
  { value: "note", label: "Note" },
];

const SELECT_CLASSES =
  "px-3 py-2 rounded-lg bg-brand-darkest border border-brand-border text-brand-text text-sm outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 transition-all";

export default function UpdateComposer({
  engagementId,
  workstreams,
  onPost,
}: UpdateComposerProps) {
  const [content, setContent] = useState("");
  const [type, setType] = useState("general");
  const [workstreamId, setWorkstreamId] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;
    setPosting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engagement_id: engagementId,
          type,
          content: content.trim(),
          workstream_id: workstreamId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post update");
      }

      setContent("");
      setType("general");
      setWorkstreamId("");
      onPost();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post update");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Content input */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write an update..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm resize-none"
      />

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type selector */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={SELECT_CLASSES}
        >
          {UPDATE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Workstream selector */}
        {workstreams && workstreams.length > 0 && (
          <select
            value={workstreamId}
            onChange={(e) => setWorkstreamId(e.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="">All workstreams</option>
            {workstreams.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.pillar?.name || "Unnamed workstream"}
              </option>
            ))}
          </select>
        )}

        {/* Post button */}
        <button
          type="button"
          onClick={handlePost}
          disabled={posting || !content.trim()}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {posting ? (
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <Send size={14} />
          )}
          Post
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
