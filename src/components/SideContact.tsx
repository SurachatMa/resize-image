"use client";

import React from "react";
import { Github, Mail } from "lucide-react";

export default function SideContact() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end">
      {/* Badge Container */}
      <div className="bg-surface/80 backdrop-blur-md border border-r-0 border-border rounded-l-xl p-3 shadow-lg flex flex-col items-center gap-4 transition-transform hover:-translate-x-1 duration-300">
        
        {/* Vertical Text */}
        <div className="writing-vertical-rl text-xs font-medium tracking-widest text-muted py-2">
          CONTACT
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-border" />

        {/* Icons */}
        <div className="flex flex-col gap-3">
          <a
            href="https://github.com/SurachatMa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-primary transition-colors hover:scale-110 active:scale-95"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:surachat.maliwan@gmail.com"
            className="text-muted hover:text-primary transition-colors hover:scale-110 active:scale-95"
            aria-label="Contact"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
