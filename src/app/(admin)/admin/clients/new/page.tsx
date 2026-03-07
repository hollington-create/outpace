"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import ClientForm from "@/components/admin/ClientForm";
import { ArrowLeft } from "lucide-react";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (data: {
    company_name: string;
    industry: string;
    website: string;
    contact_name: string;
    contact_email: string;
    contact_role: string;
    employee_count: string;
    location: string;
    notes: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to create client");
      }

      const result = await res.json();
      router.push(`/admin/clients/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Clients
      </Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
          New Client
        </h1>
        <p className="text-brand-muted mt-1">
          Create a new client account.
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <PortalCard className="p-6">
        <ClientForm onSave={handleSave} loading={loading} />
      </PortalCard>
    </div>
  );
}
