"use client";

import React, { useState } from "react";
import UploadArea from "@/components/UploadArea";
import ResultView from "@/components/ResultView";
import ErrorBoundary from "@/components/ErrorBoundary";
import ThemeToggle from "@/components/ThemeToggle";
import FormatSelector, { OutputFormat } from "@/components/FormatSelector";
import CompressionSettingsPanel, {
  CompressionSettings,
} from "@/components/CompressionSettings";
import ImagePreview from "@/components/ImagePreview";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>("webp");
  const [compressionSettings, setCompressionSettings] =
    useState<CompressionSettings>({
      quality: 80,
      maxWidth: null,
      maxHeight: null,
    });

  // New: Handle file selection (just preview, not process yet)
  const handleFileSelect = (file: File) => {
    setError(null);
    setOriginalFile(file);
    setResizedBlob(null);
  };

  // New: Handle confirm to start processing
  const handleConfirmProcess = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", originalFile);
      formData.append("format", selectedFormat);
      formData.append("quality", compressionSettings.quality.toString());
      if (compressionSettings.maxWidth) {
        formData.append("maxWidth", compressionSettings.maxWidth.toString());
      }
      if (compressionSettings.maxHeight) {
        formData.append("maxHeight", compressionSettings.maxHeight.toString());
      }

      const response = await fetch("/api/resize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const blob = await response.blob();
      setResizedBlob(blob);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Cancel and go back to upload
  const handleCancelPreview = () => {
    setOriginalFile(null);
    setError(null);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setResizedBlob(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen">
      <ThemeToggle />

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(113,40,249,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(113,40,249,0.25),transparent_50%)] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-8 py-8 flex flex-col items-center min-h-[90vh] gap-8">
        <div className="pb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary-01 via-primary-02 to-primary-03 bg-clip-text text-transparent leading-tight mb-3">
            Image Optimiser
          </h1>
          <p className="text-base md:text-lg text-muted">
            ลดขนาดไฟล์รูปภาพโดยไม่สูญเสียคุณภาพ
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!resizedBlob ? (
          <div className="w-full max-w-6xl">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
              {/* Left: Upload Area or Preview */}
              <div className="order-2 lg:order-1">
                {!originalFile ? (
                  <UploadArea
                    onFileSelect={handleFileSelect}
                    isProcessing={false}
                  />
                ) : (
                  <ImagePreview
                    file={originalFile}
                    onConfirm={handleConfirmProcess}
                    onCancel={handleCancelPreview}
                    isProcessing={isProcessing}
                  />
                )}
              </div>

              {/* Right: Settings */}
              <div className="order-1 lg:order-2 flex flex-col gap-4">
                <FormatSelector
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                />
                <CompressionSettingsPanel
                  settings={compressionSettings}
                  onSettingsChange={setCompressionSettings}
                />
              </div>
            </div>
          </div>
        ) : (
          originalFile && (
            <ErrorBoundary>
              <ResultView
                originalFile={originalFile}
                resizedBlob={resizedBlob}
                onReset={handleReset}
                outputFormat={selectedFormat}
              />
            </ErrorBoundary>
          )
        )}
      </main>
    </div>
  );
}
