"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FileUploaderProps {
  engagementId: string;
  clientId: string;
  workstreamId?: string;
  onUpload: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export default function FileUploader({
  engagementId,
  clientId,
  workstreamId,
  onUpload,
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const storagePath = `${clientId}/${engagementId}/${selectedFile.name}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("client-files")
        .upload(storagePath, selectedFile, { upsert: true });

      if (uploadError) throw uploadError;

      // Create file record via API
      const res = await fetch("/api/admin/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engagement_id: engagementId,
          workstream_id: workstreamId || null,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          storage_path: storagePath,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save file record");
      }

      clearFile();
      onUpload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {!selectedFile && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 py-8 px-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? "border-brand-cyan bg-brand-cyan/5"
              : "border-brand-border hover:border-brand-cyan/50 hover:bg-brand-darkest/50"
          }`}
        >
          <Upload
            size={24}
            className={dragOver ? "text-brand-cyan" : "text-brand-muted"}
          />
          <p className="text-sm text-brand-muted text-center">
            <span className="text-brand-cyan font-medium">Click to upload</span>{" "}
            or drag and drop
          </p>
          <input
            ref={inputRef}
            type="file"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Selected file preview */}
      {selectedFile && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-darkest border border-brand-border">
          <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
            <FileText size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-brand-text font-medium truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-brand-muted">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="p-1.5 rounded-lg text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload button */}
      {selectedFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-teal text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
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
              Uploading...
            </span>
          ) : (
            "Upload File"
          )}
        </button>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
