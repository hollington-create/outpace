"use client";

import { useState } from "react";
import { X, Plus, Calendar } from "lucide-react";

interface Deliverable {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  sort_order: number;
}

interface DeliverableListProps {
  workstreamId: string;
  deliverables: Deliverable[];
  onRefresh: () => void;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "text-gray-400 bg-gray-500/15",
  in_progress: "text-cyan-400 bg-cyan-500/15",
  review: "text-violet-400 bg-violet-500/15",
  completed: "text-emerald-400 bg-emerald-500/15",
  cancelled: "text-red-400 bg-red-500/15",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
  });
}

export default function DeliverableList({
  workstreamId,
  deliverables,
  onRefresh,
}: DeliverableListProps) {
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleAddDeliverable = async () => {
    if (!newTitle.trim()) return;
    setAdding(true);

    try {
      const res = await fetch("/api/admin/deliverables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workstream_id: workstreamId,
          title: newTitle.trim(),
          sort_order: deliverables.length,
        }),
      });

      if (res.ok) {
        setNewTitle("");
        onRefresh();
      }
    } catch {
      // Error handled silently
    } finally {
      setAdding(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);

    try {
      await fetch(`/api/admin/deliverables/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onRefresh();
    } catch {
      // Error handled silently
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deliverable?")) return;

    try {
      await fetch(`/api/admin/deliverables/${id}`, {
        method: "DELETE",
      });
      onRefresh();
    } catch {
      // Error handled silently
    }
  };

  return (
    <div className="space-y-3">
      {deliverables.length === 0 && (
        <p className="text-sm text-brand-muted py-2">
          No deliverables yet. Add one below.
        </p>
      )}

      {/* Deliverable list */}
      <div className="divide-y divide-brand-border/30">
        {deliverables.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 py-3 first:pt-0 group"
          >
            {/* Status dropdown */}
            <select
              value={d.status}
              onChange={(e) => handleStatusChange(d.id, e.target.value)}
              disabled={updatingId === d.id}
              className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ${
                STATUS_COLORS[d.status] || STATUS_COLORS.pending
              } bg-opacity-100 appearance-none`}
              style={{ backgroundImage: "none" }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Title */}
            <span className="flex-1 text-sm text-brand-text truncate">
              {d.title}
            </span>

            {/* Due date */}
            {d.due_date && (
              <span className="flex items-center gap-1 text-xs text-brand-muted">
                <Calendar size={12} />
                {formatDate(d.due_date)}
              </span>
            )}

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleDelete(d.id)}
              className="p-1 rounded text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              aria-label={`Delete ${d.title}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add deliverable form */}
      <div className="flex items-center gap-2 pt-2 border-t border-brand-border/30">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddDeliverable();
            }
          }}
          placeholder="Add a deliverable..."
          className="flex-1 px-3 py-2 rounded-lg bg-brand-darkest border border-brand-border text-brand-text placeholder:text-brand-muted/40 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 outline-none transition-all text-sm"
        />
        <button
          type="button"
          onClick={handleAddDeliverable}
          disabled={adding || !newTitle.trim()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm font-medium hover:bg-brand-cyan/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
          Add
        </button>
      </div>
    </div>
  );
}
