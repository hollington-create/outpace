import {
  MessageSquare,
  Flag,
  CheckCircle,
  Calendar,
  StickyNote,
  type LucideIcon,
} from "lucide-react";

type ActivityType = "general" | "milestone" | "deliverable" | "meeting" | "note";

interface ActivityItemProps {
  type: ActivityType;
  content: string;
  authorName?: string;
  createdAt: string;
  workstreamName?: string;
}

const TYPE_CONFIG: Record<ActivityType, { icon: LucideIcon; color: string }> = {
  general: { icon: MessageSquare, color: "text-brand-cyan" },
  milestone: { icon: Flag, color: "text-amber-400" },
  deliverable: { icon: CheckCircle, color: "text-brand-emerald" },
  meeting: { icon: Calendar, color: "text-violet-400" },
  note: { icon: StickyNote, color: "text-brand-muted" },
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export default function ActivityItem({
  type,
  content,
  authorName,
  createdAt,
  workstreamName,
}: ActivityItemProps) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.general;
  const Icon = config.icon;

  return (
    <div className="flex gap-3 py-3">
      <div
        className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-brand-darkest flex items-center justify-center ${config.color}`}
      >
        <Icon size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-brand-text leading-relaxed">{content}</p>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {authorName && (
            <span className="text-xs text-brand-muted">{authorName}</span>
          )}
          {authorName && (
            <span className="text-xs text-brand-border">·</span>
          )}
          <span className="text-xs text-brand-muted">
            {relativeTime(createdAt)}
          </span>
          {workstreamName && (
            <>
              <span className="text-xs text-brand-border">·</span>
              <span className="text-xs text-brand-cyan/80 bg-brand-cyan/10 px-1.5 py-0.5 rounded">
                {workstreamName}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
