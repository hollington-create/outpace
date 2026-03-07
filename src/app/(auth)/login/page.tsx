"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen bg-brand-darkest flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-display tracking-tight">
            <span className="text-brand-cyan-bright">OUT</span>
            <span className="text-brand-text">PACE</span>
            <span className="text-brand-cyan-bright">.</span>
          </h1>
          <p className="text-brand-muted text-sm mt-2">Client Portal</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-dark/80 backdrop-blur-xl p-8">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-brand-text mb-2">Check your email</h2>
              <p className="text-brand-muted text-sm">
                We&apos;ve sent a login link to{" "}
                <span className="text-brand-text font-medium">{email}</span>.
                Click the link to sign in.
              </p>
              <button
                onClick={() => { setStatus("idle"); setEmail(""); }}
                className="mt-6 text-brand-cyan text-sm hover:text-brand-cyan-bright transition-colors"
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-brand-text mb-1">Sign in</h2>
              <p className="text-brand-muted text-sm mb-6">
                Enter your email and we&apos;ll send you a magic link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-muted mb-1.5">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send magic link"
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-brand-muted/40 text-xs mt-6">
          &copy; {new Date().getFullYear()} Outpace. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
