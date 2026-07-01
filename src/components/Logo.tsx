import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export default function Logo({ className = "w-9 h-9", size }: LogoProps) {
  const dimension = size ? size : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      width={dimension}
      height={dimension}
      fill="none"
    >
      {/* 
        ROTATIONAL SYMMETRY CORE
        All 3 arrows and 3 wedges are rotated perfectly about the center (256, 256).
        This guarantees absolute geometric precision, zero overlapping errors, and clean lines.
      */}

      {/* ========================================== */}
      {/* DARK BLUE INTERSTITIAL WEDGES (Floating Cards) */}
      {/* ========================================== */}
      
      {/* Wedge 1: Upper-Left (Smartphone Icon) - Rotated 300 degrees */}
      <g transform="rotate(300 256 256)">
        {/* Base Wedge Shape */}
        <path
          d="M 210,340 C 240,330 272,330 302,340 L 320,385 C 280,370 232,370 192,385 Z"
          fill="#003057"
        />
        {/* Smartphone Icon */}
        <rect x="244" y="344" width="24" height="34" rx="4" fill="#76C234" />
        <rect x="247" y="347" width="18" height="24" rx="2" fill="#003057" />
        <line x1="251" y1="353" x2="261" y2="363" stroke="#76C234" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="256" cy="374" r="2" fill="#76C234" />
      </g>

      {/* Wedge 2: Right (Solar Grid Icon) - Rotated 60 degrees */}
      <g transform="rotate(60 256 256)">
        {/* Base Wedge Shape */}
        <path
          d="M 210,340 C 240,330 272,330 302,340 L 320,385 C 280,370 232,370 192,385 Z"
          fill="#003057"
        />
        {/* Solar Grid Lines */}
        <line x1="238" y1="350" x2="274" y2="350" stroke="#76C234" strokeWidth="3" strokeLinecap="round" />
        <line x1="240" y1="358" x2="272" y2="358" stroke="#76C234" strokeWidth="3" strokeLinecap="round" />
        <line x1="242" y1="366" x2="270" y2="366" stroke="#76C234" strokeWidth="3" strokeLinecap="round" />
        <line x1="244" y1="374" x2="268" y2="374" stroke="#76C234" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Wedge 3: Bottom-Left (Smart Card/Microchip) - Rotated 180 degrees */}
      <g transform="rotate(180 256 256)">
        {/* Base Wedge Shape */}
        <path
          d="M 210,340 C 240,330 272,330 302,340 L 320,385 C 280,370 232,370 192,385 Z"
          fill="#003057"
        />
        {/* Microchip Icon */}
        <rect x="241" y="348" width="30" height="22" rx="3" fill="#76C234" />
        <rect x="246" y="353" width="20" height="12" rx="1.5" fill="#003057" />
        <line x1="256" y1="353" x2="256" y2="365" stroke="#76C234" strokeWidth="1.5" />
        <line x1="246" y1="359" x2="266" y2="359" stroke="#76C234" strokeWidth="1.5" />
      </g>

      {/* ========================================== */}
      {/* BRIGHT GREEN RECYCLING LOOP ARROWS */}
      {/* ========================================== */}

      {/* Arrow 1: Top-Right (Electrical Plug Icon) - Rotated 0 degrees */}
      <g transform="rotate(0 256 256)">
        {/* Base Green Arrow Path */}
        <path
          d="M 115,210 C 130,120 210,90 310,90 L 295,60 L 380,105 L 310,150 L 325,120 C 240,120 165,140 145,210 Z"
          fill="#76C234"
        />
        {/* Electrical Plug Icon */}
        <path d="M 180,115 C 205,108 225,105 245,105" stroke="#003057" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 242,95 L 262,95 C 265,95 267,97 267,100 L 267,110 C 267,113 265,115 262,115 L 242,115 Z" fill="#003057" />
        <line x1="267" y1="101" x2="277" y2="101" stroke="#003057" strokeWidth="3" strokeLinecap="round" />
        <line x1="267" y1="109" x2="277" y2="109" stroke="#003057" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Arrow 2: Bottom (Circuit Board Trace Icon) - Rotated 120 degrees */}
      <g transform="rotate(120 256 256)">
        {/* Base Green Arrow Path */}
        <path
          d="M 115,210 C 130,120 210,90 310,90 L 295,60 L 380,105 L 310,150 L 325,120 C 240,120 165,140 145,210 Z"
          fill="#76C234"
        />
        {/* Circuit Board Trace Icon */}
        <path d="M 180,105 H 225 L 240,93 H 260" stroke="#003057" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 210,105 L 220,95" stroke="#003057" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="260" cy="93" r="4.5" fill="#003057" />
        <circle cx="220" cy="95" r="3.5" fill="#003057" />
        <circle cx="180" cy="105" r="3.5" fill="#003057" />
      </g>

      {/* Arrow 3: Left-Up (Stethoscope / Audio Cable Icon) - Rotated 240 degrees */}
      <g transform="rotate(240 256 256)">
        {/* Base Green Arrow Path */}
        <path
          d="M 115,210 C 130,120 210,90 310,90 L 295,60 L 380,105 L 310,150 L 325,120 C 240,120 165,140 145,210 Z"
          fill="#76C234"
        />
        {/* Stethoscope / Audio Cable Icon */}
        <path d="M 180,98 C 190,98 200,92 215,92" stroke="#003057" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 180,112 C 190,112 200,118 215,118" stroke="#003057" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 215,105 H 250" stroke="#003057" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="180" cy="98" r="4" fill="#003057" />
        <circle cx="180" cy="112" r="4" fill="#003057" />
        <circle cx="255" cy="105" r="7" fill="#003057" />
        <circle cx="255" cy="105" r="3.5" fill="#76C234" />
      </g>

    </svg>
  );
}
