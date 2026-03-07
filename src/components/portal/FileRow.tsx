import { FileText, ArrowDownToLine } from "lucide-react";

interface FileRowProps {
  fileName: string;
  fileSize?: number;
  createdAt: string;
  onDownload?: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FileRow({
  fileName,
  fileSize,
  createdAt,
  onDownload,
}: FileRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-brand-darkest/50 transition-colors group">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-darkest flex items-center justify-center text-brand-cyan">
        <FileText size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-brand-text font-medium truncate">
          {fileName}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {fileSize != null && (
            <>
              <span className="text-xs text-brand-muted">
                {formatFileSize(fileSize)}
              </span>
              <span className="text-xs text-brand-border">·</span>
            </>
          )}
          <span className="text-xs text-brand-muted">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {onDownload && (
        <button
          type="button"
          onClick={onDownload}
          className="flex-shrink-0 p-2 rounded-lg text-brand-muted hover:text-brand-cyan hover:bg-brand-cyan/10 transition-colors opacity-0 group-hover:opacity-100"
          aria-label={`Download ${fileName}`}
        >
          <ArrowDownToLine size={16} />
        </button>
      )}
    </div>
  );
}
