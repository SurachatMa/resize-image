"use client";

import React, { useState, useCallback } from "react";
import { Upload, FileImage, Loader2 } from "lucide-react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export default function UploadArea({
  onFileSelect,
  isProcessing,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`
        bg-card backdrop-blur-xl border rounded-3xl p-8 
        shadow-lg transition-all duration-200 w-full h-full
        ${isDragging ? "border-primary border-2" : "border-border border"}
        ${isProcessing ? "cursor-wait opacity-70" : "cursor-default"}
        hover:border-muted
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        borderStyle: "dashed",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleChange}
        disabled={isProcessing}
        className="hidden"
      />

      <div className="bg-primary/10 p-8 rounded-full mb-6 text-primary">
        {isProcessing ? (
          <Loader2 size={48} className="animate-spin" />
        ) : (
          <Upload size={48} />
        )}
      </div>

      <h3 className="text-2xl mb-2 font-semibold text-foreground">
        {isProcessing ? "Processing Image..." : "Upload an Image"}
      </h3>

      <p className="mb-8 max-w-xs text-muted">
        {isProcessing
          ? "Compressing and resizing your image while maintaining quality."
          : "Drag and drop here, or click to browse. We support JPG, PNG, WebP."}
      </p>

      {!isProcessing && (
        <label
          htmlFor="file-upload"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          <FileImage size={20} />
          Select Image
        </label>
      )}
    </div>
  );
}
