"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ZoomIn, X } from "lucide-react";

interface ImageCompareProps {
  originalFile: File;
  optimizedUrl: string;
}

export default function ImageCompare({
  originalFile,
  optimizedUrl,
}: ImageCompareProps) {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<"original" | "optimized">(
    "original"
  );

  useEffect(() => {
    const url = URL.createObjectURL(originalFile);
    setOriginalUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [originalFile]);

  const openModal = (type: "original" | "optimized") => {
    setModalImage(type);
    setShowModal(true);
  };

  return (
    <>
      <div className="w-full mb-8">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4 text-center">
          เปรียบเทียบภาพ
        </h3>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* Original Image */}
          <div className="relative group">
            <div className="aspect-video rounded-xl overflow-hidden bg-surface border border-border">
              {originalUrl && (
                <Image
                  src={originalUrl}
                  alt="Original"
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <button
              onClick={() => openModal("original")}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
            >
              <ZoomIn size={24} className="text-white" />
            </button>
            <span className="absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md">
              ก่อน
            </span>
          </div>

          <ArrowRight size={24} className="text-muted shrink-0" />

          {/* Optimized Image */}
          <div className="relative group">
            <div className="aspect-video rounded-xl overflow-hidden bg-surface border border-success/30">
              {optimizedUrl && (
                <Image
                  src={optimizedUrl}
                  alt="Optimized"
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <button
              onClick={() => openModal("optimized")}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
            >
              <ZoomIn size={24} className="text-white" />
            </button>
            <span className="absolute bottom-2 left-2 text-xs bg-success/90 text-white px-2 py-1 rounded-md">
              หลัง
            </span>
          </div>
        </div>
      </div>

      {/* Modal for full-size preview */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center rounded-3xl "
          onClick={() => setShowModal(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 z-10 w-14 h-14 flex items-center justify-center bg-neutral-30 hover:bg-neutral-40 rounded-full transition-colors"
          >
            <X size={28} className="text-white" />
          </button>

          {/* Image container - full screen */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full"> 
            <Image
              src={modalImage === "original" ? originalUrl : optimizedUrl}
              alt={modalImage === "original" ? "Original" : "Optimized"}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
              unoptimized
            />
            </div>
          </div>

          {/* Toggle buttons at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/60 backdrop-blur-md px-4 py-3 rounded-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalImage("original");
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                modalImage === "original"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              ก่อน
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalImage("optimized");
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                modalImage === "optimized"
                  ? "bg-success text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              หลัง
            </button>
          </div>
        </div>
      )}
    </>
  );
}
