"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import PortalCard from "@/components/portal/PortalCard";
import ProgressBar from "@/components/portal/ProgressBar";
import FileRow from "@/components/portal/FileRow";
import DeliverableList from "@/components/admin/DeliverableList";
import FileUploader from "@/components/admin/FileUploader";
import { ArrowLeft, Loader2, Layers } from "lucide-react";

/* ---------- Types ---------- */

interface Deliverable {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  sort_order: number;
}

interface Pillar {
  name: string;
  number: string;
}

interface WorkstreamFile {
  id: string;
  file_name: string;
  file_size: number | null;
  storage_path: string;
  created_at: string;
}

interface WorkstreamData {
  id: string;
  status: string;
  progress: number;
  notes: string | null;
  engagement_id: string;
  pillar: Pillar | null;
  deliverables: Deliverable[];
  files: WorkstreamFile[];
}

/* ---------- Constants ---------- */

const SELECT_CLASSES =
  "px-3 py-2 rounded-lg bg-brand-darkest border border-brand-border text-brand-text text-sm outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 transition-all";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
];

/* ---------- Page ---------- */

export default function WorkstreamManagementPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;
  const wsId = params.wsId as string;

  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState<WorkstreamData | null>(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/workstreams/${wsId}`);
      if (!res.ok) {
        router.push(`/admin/clients/${clientId}`);
        return;
      }
      const data = await res.json();
      setWs(data);
      setStatus(data.status || "not_started");
      setProgress(data.progress || 0);
      setNotes(data.notes || "");
    } catch {
      router.push(`/admin/clients/${clientId}`);
    } finally {
      setLoading(false);
    }
  }, [wsId, clientId, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/workstreams/${wsId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, progress, notes: notes || null }),
      });
      await fetchData();
    } catch {
      // Error handled silently
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
      </div>
    );
  }

  if (!ws) return null;

  const pillarName = ws.pillar?.name || "Workstream";
  const pillarNumber = ws.pillar?.number || "";
  const deliverables = ws.deliverables || [];
  const files = ws.files || [];

  // Calculate actual progress from deliverables if any
  const total = deliverables.length;
  const completed = deliverables.filter(
    (d) => d.status === "completed"
  ).length;
  const derivedProgress = total > 0 ? (completed / total) * 100 : progress;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href={`/admin/clients/${clientId}`}
        className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-cyan transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Client
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
          <Layers size={28} />
        </div>
        <div className="flex-1">
          {pillarNumber && (
            <p className="text-xs text-brand-muted font-medium uppercase tracking-wider mb-1">
              {pillarNumber}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
            {pillarName}
          </h1>
        </div>
      </div>

      {/* Progress overview */}
      <PortalCard className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-brand-text">
            Overall Progress
          </h2>
          <span className="text-sm text-brand-muted">
            {completed}/{total} deliverables
          </span>
        </div>
        <ProgressBar value={derivedProgress} size="md" />
      </PortalCard>

      {/* Status, Progress Slider, Save */}
      <PortalCard className="p-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">
          Workstream Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={SELECT_CLASSES + " w-full py-3 rounded-xl"}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Manual Progress Override */}
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1.5">
              Progress Override ({progress}%)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-brand-cyan mt-2"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </PortalCard>

      {/* Deliverables */}
      <PortalCard className="p-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">
          Deliverables
        </h2>
        <DeliverableList
          workstreamId={wsId}
          deliverables={deliverables}
          onRefresh={fetchData}
        />
      </PortalCard>

      {/* Files */}
      <PortalCard className="p-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">
          Files
        </h2>

        {ws.engagement_id && (
          <div className="mb-4">
            <FileUploader
              engagementId={ws.engagement_id}
              clientId={clientId}
              workstreamId={wsId}
              onUpload={fetchData}
            />
          </div>
        )}

        {files.length === 0 ? (
          <p className="text-sm text-brand-muted py-2">
            No files uploaded for this workstream yet.
          </p>
        ) : (
          <div className="divide-y divide-brand-border/30">
            {files.map((file) => (
              <FileRow
                key={file.id}
                fileName={file.file_name}
                fileSize={file.file_size ?? undefined}
                createdAt={file.created_at}
              />
            ))}
          </div>
        )}
      </PortalCard>

      {/* Notes */}
      <PortalCard className="p-6">
        <h2 className="text-lg font-semibold text-brand-text mb-4">
          Notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes about this workstream..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm resize-none mb-3"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm font-medium hover:bg-brand-cyan/20 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>
      </PortalCard>
    </div>
  );
}
