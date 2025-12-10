"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, Sparkles, FileImage, Info } from "lucide-react";

interface ImagePreviewProps {
  file: File;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export default function ImagePreview({
  file,
  onConfirm,
  onCancel,
  isProcessing,
}: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "Unknown";
  };

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-3xl p-6 shadow-lg w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileImage size={20} className="text-primary" />
          Preview รูปภาพ
        </h3>
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="p-2 hover:bg-surface rounded-lg transition-colors text-muted hover:text-foreground disabled:opacity-50"
        >
          <X size={20} />
        </button>
      </div>

      {/* Image Preview */}
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-surface/50 mb-4 min-h-[250px] flex items-center justify-center">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-[300px] object-contain"
          />
        )}
      </div>

      {/* File Info */}
      <div className="bg-surface/50 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted text-xs uppercase tracking-wider">
              ชื่อไฟล์
            </span>
            <p
              className="text-foreground font-medium truncate"
              title={file.name}
            >
              {file.name}
            </p>
          </div>
          <div>
            <span className="text-muted text-xs uppercase tracking-wider">
              ประเภท
            </span>
            <p className="text-foreground font-medium">
              {getFileExtension(file.name)}
            </p>
          </div>
          <div>
            <span className="text-muted text-xs uppercase tracking-wider">
              ขนาดไฟล์
            </span>
            <p className="text-foreground font-medium">
              {formatSize(file.size)}
            </p>
          </div>
          <div>
            <span className="text-muted text-xs uppercase tracking-wider">
              ขนาดรูป
            </span>
            <p className="text-foreground font-medium">
              {imageDimensions
                ? `${imageDimensions.width} × ${imageDimensions.height}px`
                : "กำลังโหลด..."}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 text-xs text-muted mb-4 p-3 bg-primary/5 rounded-lg">
        <Info size={14} className="flex-shrink-0 mt-0.5 text-primary" />
        <span>
          ตรวจสอบการตั้งค่าด้านขวา แล้วกดปุ่ม &quot;เริ่มบีบอัด&quot;
          เพื่อดำเนินการ
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-surface text-foreground border border-border hover:bg-surface-hover disabled:opacity-50"
        >
          เลือกรูปใหม่
        </button>
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:hover:translate-y-0 inline-flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              กำลังบีบอัด...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              เริ่มบีบอัด
            </>
          )}
        </button>
      </div>
    </div>
  );
}
