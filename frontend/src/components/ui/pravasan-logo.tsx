"use client";

import React from "react";

interface PravasanLogoProps {
  className?: string;
  variant?: "full" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "sidebar";
  showText?: boolean;
  inverted?: boolean;
}

export const PravasanLogo: React.FC<PravasanLogoProps> = ({
  className = "",
  variant = "full",
  size = "md",
  showText = true,
  inverted = false,
}) => {
  const isIconOnly = variant === "icon" || !showText;

  // Sizing definitions
  const iconSizeClass = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    sidebar: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  }[size] || "w-9 h-9";

  const kannadaTextSize = {
    sm: "text-sm",
    md: "text-base",
    sidebar: "text-base",
    lg: "text-xl",
    xl: "text-2xl",
  }[size] || "text-base";

  const englishTextSize = {
    sm: "text-[10px]",
    md: "text-xs",
    sidebar: "text-xs",
    lg: "text-sm",
    xl: "text-base",
  }[size] || "text-xs";

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none group transition-transform hover:scale-[1.02] cursor-pointer ${className}`}
    >
      {/* ─── 🚩 Karnataka Heritage Emblem (Arishina-Kunkuma Red & Yellow with Hampi Chariot Kalasha) ─── */}
      <div
        className={`relative ${iconSizeClass} shrink-0 rounded-xl border-[2.5px] border-[#171313] overflow-hidden shadow-[2px_2px_0px_#171313] bg-white flex flex-col`}
      >
        {/* Karnataka Flag Red Half */}
        <div className="h-1/2 w-full bg-[#E51919] flex items-center justify-center relative">
          <div className="absolute -bottom-1 w-3 h-3 rounded-full bg-[#FFD700] border border-[#171313] z-10" />
        </div>
        {/* Karnataka Flag Turmeric Yellow Half */}
        <div className="h-1/2 w-full bg-[#FFD700] flex items-center justify-center" />

        {/* Central Hampi Heritage Chariot & Sun Emblem SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#171313] drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
            fill="currentColor"
          >
            {/* Temple Gopura / Chariot Silhouette */}
            <path d="M12 2L15 8H9L12 2Z" fill="#171313" />
            <path d="M6 8H18V10H6V8Z" fill="#171313" />
            <path d="M7 10H17V15H7V10Z" fill="#FFFDF8" stroke="#171313" strokeWidth="1" />
            <circle cx="12" cy="12.5" r="1.5" fill="#E51919" />
            <path d="M5 15H19V17H5V15Z" fill="#171313" />
            {/* Chariot Wheels */}
            <circle cx="8" cy="19" r="2.5" fill="#171313" />
            <circle cx="8" cy="19" r="1" fill="#FFD700" />
            <circle cx="16" cy="19" r="2.5" fill="#171313" />
            <circle cx="16" cy="19" r="1" fill="#FFD700" />
          </svg>
        </div>
      </div>

      {/* ─── 🏛️ Dual-Script Typography: Kannada (ಪ್ರವಾಸನ್) + English (PRAVASAN) ─── */}
      {!isIconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${kannadaTextSize} ${
                inverted ? "text-white" : "text-[#E51919]"
              }`}
              style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}
            >
              ಪ್ರವಾಸನ್
            </span>
            <span
              className={`font-display font-black tracking-wider uppercase ${englishTextSize} ${
                inverted ? "text-white/90" : "text-[#171313]"
              }`}
            >
              PRAVASAN
            </span>
          </div>
          <span
            className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
              inverted ? "text-amber-200" : "text-neutral-600"
            }`}
          >
            ಕರ್ನಾಟಕ • KARNATAKA
          </span>
        </div>
      )}
    </div>
  );
};

