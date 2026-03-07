interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
  in_progress: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
  completed: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  pending: { bg: "bg-gray-500/15", text: "text-gray-400" },
  not_started: { bg: "bg-gray-500/15", text: "text-gray-400" },
  on_hold: { bg: "bg-amber-500/15", text: "text-amber-400" },
  paused: { bg: "bg-amber-500/15", text: "text-amber-400" },
  review: { bg: "bg-violet-500/15", text: "text-violet-400" },
  cancelled: { bg: "bg-red-500/15", text: "text-red-400" },
  draft: { bg: "bg-gray-500/15", text: "text-gray-400" },
};

const DEFAULT_STYLE = { bg: "bg-gray-500/15", text: "text-gray-400" };

function formatLabel(status: string): string {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE;
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${style.bg} ${style.text} ${sizeClasses}`}
    >
      {formatLabel(status)}
    </span>
  );
}
