"use client";

import React from "react";
import { Download, RefreshCw, FileCheck, ArrowRight } from "lucide-react";
import ImageCompare from "./ImageCompare";
import { OutputFormat } from "./FormatSelector";

interface ResultViewProps {
  originalFile: File;
  resizedBlob: Blob;
  onReset: () => void;
  outputFormat: OutputFormat;
}

const formatLabels: Record<OutputFormat, string> = {
  jpeg: "JPEG",
  webp: "WebP",
  png: "PNG",
  avif: "AVIF",
};

const formatExtensions: Record<OutputFormat, string> = {
  jpeg: "jpg",
  webp: "webp",
  png: "png",
  avif: "avif",
};

export default function ResultView({
  originalFile,
  resizedBlob,
  onReset,
  outputFormat,
}: ResultViewProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const [downloadUrl, setDownloadUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (resizedBlob) {
      const url = URL.createObjectURL(resizedBlob);
      setDownloadUrl(url);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [resizedBlob]);

  if (!originalFile || !resizedBlob) {
    return null;
  }

  const originalSize = originalFile.size || 0;
  const resizedSize = resizedBlob.size || 0;
  const reduction =
    originalSize > 0
      ? (((originalSize - resizedSize) / originalSize) * 100).toFixed(1)
      : "0";

  const originalName = originalFile.name.replace(/\.[^/.]+$/, "");
  const outputFilename = `optimized-${originalName}.${formatExtensions[outputFormat]}`;

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-3xl p-8 shadow-lg max-w-2xl w-full animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-success/10 p-5 rounded-full text-success">
          <FileCheck size={36} />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-2 text-foreground">Success!</h2>
      <p className="mb-6 text-muted">
        Your image has been optimized to{" "}
        <span className="font-semibold text-primary">
          {formatLabels[outputFormat]}
        </span>{" "}
        format.
      </p>

      {/* Image Preview Compare */}
      <ImageCompare originalFile={originalFile} optimizedUrl={downloadUrl} />

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center bg-surface/50 p-6 rounded-2xl mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted uppercase tracking-wider">
            Original
          </span>
          <span className="text-xl font-bold">{formatSize(originalSize)}</span>
          <span className="text-xs text-muted">
            {originalFile.name.split(".").pop()?.toUpperCase()}
          </span>
        </div>

        <ArrowRight size={20} className="text-muted" />

        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted uppercase tracking-wider">
            Optimized
          </span>
          <span className="text-xl font-bold text-success">
            {formatSize(resizedSize)}
          </span>
          <span className="text-xs text-success font-medium">
            {formatLabels[outputFormat]}
          </span>
        </div>
      </div>

      <div className="mb-8 py-3 px-4 bg-success/10 rounded-lg text-success font-semibold">
        🎉 คุณประหยัดขนาดไฟล์ได้ {reduction}%
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 bg-surface text-foreground border border-border hover:bg-surface-hover hover:border-zinc-600"
        >
          <RefreshCw size={18} />
          เริ่มใหม่
        </button>

        <a
          href={downloadUrl}
          download={outputFilename}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] no-underline"
        >
          <Download size={18} />
          ดาวน์โหลด {formatLabels[outputFormat]}
        </a>
      </div>
    </div>
  );
}
