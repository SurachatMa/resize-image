"use client";

import React, { useState } from "react";
import { Zap, Eye, FileImage, Info } from "lucide-react";

export type OutputFormat = "jpeg" | "webp" | "png" | "avif";

interface FormatOption {
  value: OutputFormat;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

const formatOptions: FormatOption[] = [
  {
    value: "webp",
    label: "WebP",
    description: "เบาที่สุด รองรับเบราว์เซอร์สมัยใหม่ แนะนำสำหรับเว็บไซต์",
    badge: "เบาสุด",
    badgeColor: "bg-success/20 text-success",
  },
  {
    value: "avif",
    label: "AVIF",
    description: "เบามาก คุณภาพสูง แต่บางเบราว์เซอร์ยังไม่รองรับ",
    badge: "ใหม่ล่าสุด",
    badgeColor: "bg-purple-500/20 text-purple-500",
  },
  {
    value: "jpeg",
    label: "JPEG",
    description: "รองรับทุกที่ เหมาะกับรูปถ่าย ไม่รองรับพื้นหลังโปร่งใส",
    badge: "ยอดนิยม",
    badgeColor: "bg-primary/20 text-primary",
  },
  {
    value: "png",
    label: "PNG",
    description: "คมชัดสุด รองรับพื้นหลังโปร่งใส ไฟล์จะใหญ่กว่า",
    badge: "คมชัดสุด",
    badgeColor: "bg-amber-500/20 text-amber-500",
  },
];

interface FormatSelectorProps {
  selectedFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
}

export default function FormatSelector({
  selectedFormat,
  onFormatChange,
}: FormatSelectorProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileImage size={16} />
          เลือกรูปแบบไฟล์ที่ต้องการ
        </label>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-muted hover:text-foreground transition-colors"
          aria-label="แสดงข้อมูลเพิ่มเติม"
        >
          <Info size={16} />
        </button>
      </div>

      {showInfo && (
        <div className="mb-4 p-4 bg-surface/50 rounded-xl border border-border text-left text-sm">
          <h4 className="font-semibold mb-2 text-foreground">
            📖 ความแตกต่างของแต่ละรูปแบบ
          </h4>
          <ul className="space-y-2 text-muted">
            <li className="flex gap-2">
              <Zap size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-foreground">WebP/AVIF:</strong>{" "}
                เทคโนโลยีใหม่ บีบอัดได้ดีกว่า JPEG 25-35%
              </span>
            </li>
            <li className="flex gap-2">
              <Eye size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-foreground">PNG:</strong> ไม่สูญเสีย
                คุณภาพ (Lossless) เหมาะกับโลโก้ กราฟิก
              </span>
            </li>
            <li className="flex gap-2">
              <FileImage
                size={14}
                className="text-primary mt-0.5 flex-shrink-0"
              />
              <span>
                <strong className="text-foreground">JPEG:</strong> มาตรฐานเดิม
                รองรับทุกอุปกรณ์ เหมาะกับรูปถ่าย
              </span>
            </li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {formatOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFormatChange(option.value)}
            className={`
              relative p-3 rounded-xl border text-left transition-all duration-200
              ${
                selectedFormat === option.value
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                  : "border-border bg-surface/30 hover:bg-surface/50 hover:border-muted"
              }
            `}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-foreground">
                {option.label}
              </span>
              {option.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${option.badgeColor}`}
                >
                  {option.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
