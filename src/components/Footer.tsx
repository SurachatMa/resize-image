import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface/30 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-sm text-muted">
          © {currentYear} Image Optimiser. All rights reserved.
        </div>

        {/* Made with Love */}
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>Made with</span>
          <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
          <span>by Surachat</span>
        </div>
      </div>
    </footer>
  );
}
