"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

interface InviteUserFormProps {
  clientId: string;
  onInvite: () => void;
}

export default function InviteUserForm({
  clientId,
  onInvite,
}: InviteUserFormProps) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          email: email.trim(),
          display_name: displayName.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send invite");
      }

      setStatus("success");
      setEmail("");
      setDisplayName("");
      onInvite();

      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send invite"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="invite-email"
            className="block text-sm font-medium text-brand-muted mb-1.5"
          >
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="invite-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@company.com"
            className="w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="invite-name"
            className="block text-sm font-medium text-brand-muted mb-1.5"
          >
            Display Name
          </label>
          <input
            id="invite-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Jane Doe (optional)"
            className="w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
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
            <UserPlus size={16} />
          )}
          Send Invite
        </button>

        {status === "success" && (
          <span className="text-sm text-emerald-400">
            Invite sent successfully!
          </span>
        )}

        {status === "error" && (
          <span className="text-sm text-red-400">{errorMsg}</span>
        )}
      </div>
    </form>
  );
}
