interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
}

export default function ProgressBar({ value, size = "sm" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 rounded-full bg-brand-darkest ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r from-brand-cyan to-brand-emerald transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs text-brand-muted tabular-nums font-medium min-w-[2.5rem] text-right">
        {Math.round(clamped)}%
      </span>
    </div>
  );
}
