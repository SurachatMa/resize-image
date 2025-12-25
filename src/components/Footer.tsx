import React from "react";
import { Heart, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface/30 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-sm text-muted">
          © {currentYear} Image Optimiser. All rights reserved.
        </div>

        {/* Made with Love and Contacts */}
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>Made with</span>
          <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
          <span>by Surachat</span>
          <a
            href="https://github.com/SurachatMa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors hover:scale-110 active:scale-95 ml-2"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:surachat.maliwan@gmail.com"
            className="text-muted hover:text-primary transition-colors hover:scale-110 active:scale-95 ml-2"
            aria-label="Contact"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
