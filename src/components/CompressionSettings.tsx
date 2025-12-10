"use client";

import React from "react";
import { Maximize, Gauge, Scan, Scaling, Crop } from "lucide-react";

export interface CompressionSettings {
  quality: number;
  maxWidth: number | null;
  maxHeight: number | null;
  fit: "inside" | "cover" | "fill";
}

interface CompressionSettingsProps {
  settings: CompressionSettings;
  onSettingsChange: (settings: CompressionSettings) => void;
}

const presetSizes = [
  {
    label: "ดั้งเดิม",
    width: null,
    height: null,
    description: "ไม่เปลี่ยนขนาด",
  },
  { label: "4K", width: 3840, height: 2160, description: "3840px" },
  { label: "Full HD", width: 1920, height: 1080, description: "1920px" },
  { label: "HD", width: 1280, height: 720, description: "1280px" },
  { label: "Medium", width: 800, height: 600, description: "800px" },
  { label: "Small", width: 480, height: 360, description: "480px" },
];

export default function CompressionSettingsPanel({
  settings,
  onSettingsChange,
}: CompressionSettingsProps) {
  const getQualityLabel = (quality: number) => {
    if (quality >= 90) return { text: "สูงมาก", color: "text-success" };
    if (quality >= 75) return { text: "สูง", color: "text-primary" };
    if (quality >= 50) return { text: "ปานกลาง", color: "text-amber-500" };
    return { text: "ต่ำ", color: "text-red-500" };
  };

  const qualityLabel = getQualityLabel(settings.quality);

  const currentPreset = presetSizes.find(
    (p) => p.width === settings.maxWidth && p.height === settings.maxHeight
  );

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Quality Slider */}
      <div className="bg-surface/30 border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Gauge size={16} />
            คุณภาพรูปภาพ
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${qualityLabel.color}`}>
              {settings.quality}%
            </span>
            <span className={`text-xs ${qualityLabel.color}`}>
              ({qualityLabel.text})
            </span>
          </div>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          value={settings.quality}
          onChange={(e) =>
            onSettingsChange({
              ...settings,
              quality: parseInt(e.target.value),
            })
          }
          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="flex justify-between mt-2 text-xs text-muted">
          <span>ไฟล์เล็ก</span>
          <span>คมชัด</span>
        </div>

        <p className="text-xs text-muted mt-3 p-2 bg-surface/50 rounded-lg">
          💡 แนะนำ: 75-85% สำหรับเว็บไซต์ (สมดุลระหว่างขนาดและคุณภาพ)
        </p>
      </div>

      {/* Max Size */}
      <div className="bg-surface/30 border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Maximize size={16} />
            ขนาดสูงสุด
          </label>
          {settings.maxWidth && (
            <span className="text-xs text-muted">
              {settings.maxWidth} x {settings.maxHeight}px
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {presetSizes.map((preset) => (
            <button
              key={preset.label}
              onClick={() =>
                onSettingsChange({
                  ...settings,
                  maxWidth: preset.width,
                  maxHeight: preset.height,
                })
              }
              className={`
                px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center
                ${
                  currentPreset?.label === preset.label
                    ? "bg-primary text-white"
                    : "bg-surface/50 text-muted hover:bg-surface hover:text-foreground border border-border"
                }
              `}
            >
              <span>{preset.label}</span>
              <span className="text-[10px] opacity-70">
                {preset.description}
              </span>
            </button>
          ))}
        </div>

        {/* Custom Size Input */}
        <div className="space-y-2">
          <label className="text-xs text-muted">หรือกำหนดเอง:</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="number"
                placeholder="กว้าง"
                value={settings.maxWidth || ""}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    maxWidth: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <span className="text-muted">×</span>
            <div className="flex-1">
              <input
                type="number"
                placeholder="สูง"
                value={settings.maxHeight || ""}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    maxHeight: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <span className="text-xs text-muted">px</span>
          </div>
        </div>


        <p className="text-xs text-muted mt-3 p-2 bg-surface/50 rounded-lg">
          📐 รูปจะถูกย่อให้พอดีกับขนาดที่กำหนด โดยรักษาสัดส่วนเดิม
        </p>

        {/* Resize Mode - Only show when custom size is set */}
        {(settings.maxWidth || settings.maxHeight) && (
          <div className="space-y-3 pt-3 border-t border-border mt-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Scan size={16} />
              โหมดการย่อ
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onSettingsChange({ ...settings, fit: "inside" })}
                className={`
                  p-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1 border
                  ${
                    settings.fit === "inside"
                      ? "bg-primary text-white border-primary"
                      : "bg-surface/50 text-muted hover:bg-surface hover:text-foreground border-border"
                  }
                `}
              >
                <Scaling size={14} />
                <span>พอดี</span>
              </button>
              <button
                onClick={() => onSettingsChange({ ...settings, fit: "cover" })}
                className={`
                  p-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1 border
                  ${
                    settings.fit === "cover"
                      ? "bg-primary text-white border-primary"
                      : "bg-surface/50 text-muted hover:bg-surface hover:text-foreground border-border"
                  }
                `}
              >
                <Crop size={14} />
                <span>ตัดส่วน</span>
              </button>
              <button
                onClick={() => onSettingsChange({ ...settings, fit: "fill" })}
                className={`
                  p-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1 border
                  ${
                    settings.fit === "fill"
                      ? "bg-primary text-white border-primary"
                      : "bg-surface/50 text-muted hover:bg-surface hover:text-foreground border-border"
                  }
                `}
              >
                <Maximize size={14} />
                <span>ยืด</span>
              </button>
            </div>
            <p className="text-xs text-muted">
              {settings.fit === "inside" &&
                "รักษาอัตราส่วนเดิม ขนาดอาจไม่เท่ากับที่กำหนดเป๊ะๆ"}
              {settings.fit === "cover" &&
                "ตัดส่วนเกินออกเพื่อให้ได้ขนาดเท่าที่กำหนด (ภาพไม่เบี้ยว)"}
              {settings.fit === "fill" &&
                "ยืดรูปภาพให้เต็มขนาดที่กำหนด (ภาพอาจเบี้ยว)"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
