"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  ExternalLink,
  MapPin,
  Compass,
  X,
  Check,
} from "lucide-react";
import type { NetworkLocation } from "@/lib/data/locations";
import { networkLocations, geoToSvg } from "@/lib/data/locations";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

// Detailed aesthetic SVG landmass paths mapped for Equirectangular projection (0 0 1000 500)
const WORLD_LANDMASS_PATHS = [
  {
    name: "North America",
    path: "M 130 50 L 160 45 L 210 55 L 250 65 L 310 75 L 360 85 L 350 110 L 320 120 L 310 145 L 290 170 L 295 190 L 275 220 L 250 240 L 235 270 L 250 280 L 270 265 L 295 285 L 280 300 L 270 285 L 250 270 L 230 245 L 210 230 L 180 220 L 160 190 L 180 170 L 195 140 L 175 130 L 140 145 L 110 125 L 90 95 L 110 75 Z",
  },
  {
    name: "Greenland",
    path: "M 360 30 L 410 25 L 440 35 L 430 75 L 390 90 L 365 75 Z",
  },
  {
    name: "South America",
    path: "M 300 305 L 330 300 L 360 310 L 390 325 L 415 350 L 420 380 L 395 420 L 375 460 L 360 480 L 350 460 L 355 420 L 340 380 L 325 350 L 305 325 Z",
  },
  {
    name: "Europe",
    path: "M 480 95 L 510 85 L 540 65 L 565 75 L 560 105 L 540 115 L 560 135 L 585 140 L 575 165 L 545 170 L 520 185 L 490 175 L 475 155 L 495 135 L 475 115 Z",
  },
  {
    name: "British Isles",
    path: "M 470 105 L 485 100 L 490 115 L 475 125 Z M 460 110 L 468 112 L 465 122 L 458 118 Z",
  },
  {
    name: "Africa",
    path: "M 465 190 L 515 185 L 565 195 L 610 230 L 615 265 L 585 295 L 575 345 L 590 390 L 575 435 L 545 440 L 530 400 L 510 350 L 495 310 L 460 280 L 450 235 Z",
  },
  {
    name: "Madagascar",
    path: "M 615 360 L 628 355 L 632 395 L 618 410 Z",
  },
  {
    name: "Middle East",
    path: "M 570 175 L 615 170 L 640 190 L 655 220 L 630 250 L 590 235 L 570 205 Z",
  },
  {
    name: "Eurasia / Northern Asia",
    path: "M 570 65 L 630 55 L 710 45 L 810 40 L 910 50 L 960 65 L 940 105 L 890 115 L 840 110 L 780 125 L 720 115 L 660 135 L 600 125 L 575 100 Z",
  },
  {
    name: "Central & East Asia",
    path: "M 650 140 L 730 130 L 800 135 L 870 150 L 895 180 L 875 220 L 820 240 L 760 220 L 710 200 L 660 180 Z",
  },
  {
    name: "India Peninsula",
    path: "M 690 200 L 735 195 L 760 220 L 745 260 L 725 295 L 710 290 L 685 245 L 675 220 Z",
  },
  {
    name: "Sri Lanka",
    path: "M 728 300 L 736 298 L 734 312 L 726 310 Z",
  },
  {
    name: "Southeast Asia",
    path: "M 770 225 L 825 235 L 860 265 L 830 300 L 795 280 L 775 250 Z",
  },
  {
    name: "Japan",
    path: "M 885 145 L 905 150 L 915 185 L 895 200 L 880 175 Z",
  },
  {
    name: "Indonesia & Philippines",
    path: "M 810 310 L 850 305 L 890 320 L 860 335 L 820 330 Z M 870 260 L 890 255 L 885 290 L 865 285 Z",
  },
  {
    name: "Australia",
    path: "M 830 365 L 880 350 L 925 365 L 935 410 L 910 445 L 860 450 L 825 415 L 820 385 Z",
  },
  {
    name: "Tasmania",
    path: "M 900 460 L 915 458 L 912 472 L 898 470 Z",
  },
  {
    name: "New Zealand",
    path: "M 950 420 L 965 415 L 955 450 Z M 935 440 L 948 435 L 940 470 Z",
  },
];

// Connection Arcs between key network hubs
const NETWORK_CONNECTIONS = [
  { from: "india", to: "europe" },
  { from: "india", to: "east-asia" },
  { from: "europe", to: "north-america" },
  { from: "north-america", to: "latin-america" },
  { from: "europe", to: "africa" },
];

interface WorldMapSvgProps {
  onSelectLocation?: (loc: NetworkLocation) => void;
  selectedLocationId?: string | null;
}

export const WorldMapSvg: React.FC<WorldMapSvgProps> = ({
  onSelectLocation,
  selectedLocationId,
}) => {
  const shouldReduceMotion = useSafeReducedMotion();
  const [hoveredLoc, setHoveredLoc] = useState<NetworkLocation | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<NetworkLocation | null>(
    networkLocations.find((l) => l.id === selectedLocationId) || null
  );

  // Directions Modal state
  const [directionsLoc, setDirectionsLoc] = useState<NetworkLocation | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // SVG ViewBox Zoom/Pan State
  const defaultViewBox = { x: 0, y: 0, w: 1000, h: 500 };
  const [viewBox, setViewBox] = useState(defaultViewBox);
  const [isZoomed, setIsZoomed] = useState(false);

  const focusLocation = useCallback((loc: NetworkLocation) => {
    const { x, y } = geoToSvg(loc.latitude, loc.longitude);
    const zoomWidth = 400;
    const zoomHeight = 200;
    const targetX = Math.max(0, Math.min(1000 - zoomWidth, x - zoomWidth / 2));
    const targetY = Math.max(0, Math.min(500 - zoomHeight, y - zoomHeight / 2));

    setViewBox({ x: targetX, y: targetY, w: zoomWidth, h: zoomHeight });
    setIsZoomed(true);
  }, []);

  // Sync selectedLocationId prop changes
  useEffect(() => {
    if (selectedLocationId) {
      const found = networkLocations.find((l) => l.id === selectedLocationId);
      if (found) {
        setSelectedLoc(found);
        focusLocation(found);
      }
    }
  }, [selectedLocationId, focusLocation]);

  const handleSelect = (loc: NetworkLocation) => {
    setSelectedLoc(loc);
    focusLocation(loc);
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
  };

  const resetView = () => {
    setViewBox(defaultViewBox);
    setIsZoomed(false);
    setSelectedLoc(null);
  };

  const zoomIn = () => {
    setViewBox((prev) => {
      const nw = Math.max(250, prev.w * 0.75);
      const nh = Math.max(125, prev.h * 0.75);
      const nx = Math.max(0, Math.min(1000 - nw, prev.x + (prev.w - nw) / 2));
      const ny = Math.max(0, Math.min(500 - nh, prev.y + (prev.h - nh) / 2));
      return { x: nx, y: ny, w: nw, h: nh };
    });
    setIsZoomed(true);
  };

  const zoomOut = () => {
    setViewBox((prev) => {
      const nw = Math.min(1000, prev.w * 1.33);
      const nh = Math.min(500, prev.h * 1.33);
      if (nw >= 950) return defaultViewBox;
      const nx = Math.max(0, Math.min(1000 - nw, prev.x - (nw - prev.w) / 2));
      const ny = Math.max(0, Math.min(500 - nh, prev.y - (nh - prev.h) / 2));
      return { x: nx, y: ny, w: nw, h: nh };
    });
  };

  // Platform detection for directions
  const isApplePlatform = () => {
    if (typeof window === "undefined") return false;
    return /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent || navigator.platform);
  };

  const getGoogleMapsUrl = (loc: NetworkLocation) => {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  };

  const getAppleMapsUrl = (loc: NetworkLocation) => {
    return `https://maps.apple.com/?q=${encodeURIComponent(loc.name)}&ll=${loc.latitude},${loc.longitude}`;
  };

  const copyCoordinates = (loc: NetworkLocation) => {
    navigator.clipboard.writeText(`${loc.latitude}, ${loc.longitude}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Map Container Box */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full rounded-2xl bg-[#0b0e0c] dark:bg-[#0b0e0c] border border-bone-200/15 dark:border-bone-50/15 overflow-hidden shadow-2xl transition-all duration-500 group select-none">
        {/* Fine Digital Grid Overlay */}
        <div className="absolute inset-0 digital-grid opacity-25 pointer-events-none z-0" />

        {/* Top-Right Vertical Circular Map Controls */}
        <div className="absolute bottom-6 right-6 z-30 flex flex-col items-center space-y-2">
          <button
            onClick={zoomIn}
            aria-label="Zoom In"
            title="Zoom In"
            className="w-9 h-9 rounded-full bg-carbon-950/80 backdrop-blur-md border border-bone-50/15 text-bone-200 hover:text-earth-400 hover:border-earth-500/40 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            aria-label="Zoom Out"
            title="Zoom Out"
            className="w-9 h-9 rounded-full bg-carbon-950/80 backdrop-blur-md border border-bone-50/15 text-bone-200 hover:text-earth-400 hover:border-earth-500/40 flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          {isZoomed && (
            <button
              onClick={resetView}
              aria-label="Reset World View"
              title="Reset World View"
              className="w-9 h-9 rounded-full bg-carbon-950/80 backdrop-blur-md border border-earth-500/40 text-earth-400 hover:text-earth-300 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* SVG World Map Canvas */}
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{ transitionProperty: "viewBox" }}
        >
          <defs>
            {/* Ambient Radial Gradient */}
            <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0e1511" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#080c09" stopOpacity="1" />
            </radialGradient>

            {/* Marker Glow Filter */}
            <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ocean Background */}
          <rect width="1000" height="500" fill="url(#oceanGlow)" />

          {/* Faint Gridlines (3% opacity) */}
          <g stroke="#1e2e23" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15">
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="0" y1="375" x2="1000" y2="375" />
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="500" y1="0" x2="500" y2="500" />
            <line x1="750" y1="0" x2="750" y2="500" />
          </g>

          {/* Continents & Landmasses SVG Paths */}
          <g
            fill="#142017"
            stroke="#223527"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {WORLD_LANDMASS_PATHS.map((land) => (
              <path
                key={land.name}
                d={land.path}
                className="transition-colors duration-300 hover:fill-[#192a1e]"
              >
                <title>{land.name}</title>
              </path>
            ))}
          </g>

          {/* Network Interconnection Arcs (Subtle Copper lines) */}
          <g stroke="#ea580c" strokeWidth="0.8" opacity="0.15" strokeDasharray="2 4">
            {NETWORK_CONNECTIONS.map((conn, idx) => {
              const fromLoc = networkLocations.find((l) => l.id === conn.from);
              const toLoc = networkLocations.find((l) => l.id === conn.to);
              if (!fromLoc || !toLoc) return null;

              const p1 = geoToSvg(fromLoc.latitude, fromLoc.longitude);
              const p2 = geoToSvg(toLoc.latitude, toLoc.longitude);

              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2 - 35;

              return (
                <path
                  key={`${conn.from}-${conn.to}-${idx}`}
                  d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                  fill="none"
                />
              );
            })}
          </g>

          {/* Interactive Network Location Markers */}
          {networkLocations.map((loc) => {
            const { x, y } = geoToSvg(loc.latitude, loc.longitude);
            const isSelected = selectedLoc?.id === loc.id;
            const isHovered = hoveredLoc?.id === loc.id;

            return (
              <g
                key={loc.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer group/marker outline-none"
                tabIndex={0}
                role="button"
                aria-label={`${loc.name} — ${loc.chapterType}`}
                onClick={() => handleSelect(loc)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(loc);
                  }
                }}
                onMouseEnter={() => setHoveredLoc(loc)}
                onMouseLeave={() => setHoveredLoc(null)}
              >
                {/* Outer Pulsing Ring for Selected Marker */}
                {isSelected && (
                  <circle
                    r="14"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="1.2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Halo Ring */}
                <circle
                  r={isSelected ? "12" : isHovered ? "9" : "6"}
                  fill={isSelected ? "#ea580c" : isHovered ? "#ea580c" : "#2a4232"}
                  opacity={isSelected ? "0.3" : isHovered ? "0.4" : "0.2"}
                  className="transition-all duration-300"
                />

                {/* Solid Core Dot */}
                <circle
                  r={isSelected ? "6" : isHovered ? "4.5" : "3.5"}
                  fill={isSelected ? "#ea580c" : isHovered ? "#ea580c" : "#4ade80"}
                  stroke={isSelected ? "#f3ebd9" : "#142017"}
                  strokeWidth={isSelected ? "1.5" : "1"}
                  filter={isSelected || isHovered ? "url(#orangeGlow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Refined Title-Cased Country Label */}
                <text
                  x="9"
                  y="3.5"
                  fill={isSelected ? "#ea580c" : isHovered ? "#f3ebd9" : "#d5d0c4"}
                  fontSize={isSelected ? "10.5" : "9"}
                  fontWeight={isSelected ? "600" : "500"}
                  fontFamily="var(--font-manrope), sans-serif"
                  letterSpacing="0.02em"
                  className="pointer-events-none select-none transition-all duration-300 drop-shadow"
                >
                  {loc.country}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Compact Hover Tooltip Overlay */}
        <AnimatePresence>
          {hoveredLoc && !selectedLoc && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 left-6 z-40 bg-carbon-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-bone-50/15 shadow-xl flex items-center space-x-3 pointer-events-none"
            >
              <div className="w-2 h-2 rounded-full bg-earth-500 animate-pulse" />
              <div>
                <div className="font-serif text-xs font-bold text-bone-50 tracking-wide">
                  {hoveredLoc.name}
                </div>
                <div className="font-mono text-[10px] text-earth-400 font-medium">
                  {hoveredLoc.chapterType}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Location Card Panel */}
      <AnimatePresence mode="wait">
        {selectedLoc && (
          <motion.div
            key={selectedLoc.id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-7 rounded-2xl bg-carbon-900/90 border border-carbon-950/10 dark:border-bone-50/15 shadow-xl relative overflow-hidden backdrop-blur-xl"
          >
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-earth-500/8 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-earth-500/15 border border-earth-500/30 text-earth-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                    {selectedLoc.region}
                  </span>
                  {selectedLoc.city && (
                    <span className="px-2.5 py-0.5 rounded-full bg-bone-100/10 text-bone-300 font-mono text-[10px] font-medium tracking-wider">
                      {selectedLoc.city}
                    </span>
                  )}
                  <span className="text-bone-400 font-mono text-[10px] uppercase tracking-wider pl-1">
                    {selectedLoc.chapterType}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-bone-50">
                  {selectedLoc.name}
                </h3>

                <p className="font-sans text-xs md:text-sm text-bone-200 leading-relaxed font-medium">
                  {selectedLoc.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => focusLocation(selectedLoc)}
                  className="px-4 py-2.5 rounded-xl bg-bone-100/10 hover:bg-bone-100/20 border border-bone-50/15 text-bone-100 text-xs font-sans tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-earth-400" />
                  <span>View Location</span>
                </button>

                <button
                  onClick={() => setDirectionsLoc(selectedLoc)}
                  className="px-4 py-2.5 rounded-xl bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-sans tracking-widest uppercase font-semibold transition-colors flex items-center space-x-2 shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={resetView}
                  aria-label="Close location card"
                  className="p-2.5 rounded-xl bg-carbon-950 text-bone-300 hover:text-bone-50 hover:bg-carbon-950/80 transition-colors cursor-pointer border border-bone-50/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get Directions Modal */}
      <AnimatePresence>
        {directionsLoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/80 backdrop-blur-md">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-carbon-900 border border-bone-50/15 rounded-2xl p-6 shadow-2xl space-y-6 relative"
            >
              <div className="flex items-center justify-between border-b border-bone-50/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-earth-400" />
                  <h4 className="font-serif text-lg font-bold text-bone-50 uppercase tracking-wide">
                    Open Directions
                  </h4>
                </div>
                <button
                  onClick={() => setDirectionsLoc(null)}
                  className="text-bone-400 hover:text-bone-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-earth-400 uppercase tracking-widest font-semibold">
                  {directionsLoc.name}
                </div>
                <div className="text-xs text-bone-300 font-sans">
                  Select your preferred navigation application:
                </div>
              </div>

              {/* Navigation Options */}
              <div className="space-y-3">
                {/* Google Maps Option */}
                <a
                  href={getGoogleMapsUrl(directionsLoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    !isApplePlatform()
                      ? "bg-earth-500/15 border-earth-500/40 text-bone-50"
                      : "bg-carbon-950 border-bone-50/10 text-bone-200 hover:border-earth-500/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-carbon-800 text-earth-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-sans text-sm font-semibold">Google Maps</div>
                      <div className="font-mono text-[10px] text-bone-400">
                        {directionsLoc.latitude}, {directionsLoc.longitude}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-bone-400" />
                </a>

                {/* Apple Maps Option */}
                <a
                  href={getAppleMapsUrl(directionsLoc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    isApplePlatform()
                      ? "bg-earth-500/15 border-earth-500/40 text-bone-50"
                      : "bg-carbon-950 border-bone-50/10 text-bone-200 hover:border-earth-500/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-carbon-800 text-earth-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-sans text-sm font-semibold">Apple Maps</div>
                      <div className="font-mono text-[10px] text-bone-400">
                        Native iOS / macOS Navigation
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-bone-400" />
                </a>
              </div>

              {/* Copy Coordinates Button */}
              <div className="pt-2 border-t border-bone-50/10 flex items-center justify-between">
                <button
                  onClick={() => copyCoordinates(directionsLoc)}
                  className="text-xs font-mono text-bone-400 hover:text-earth-400 transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-earth-400" />
                      <span className="text-earth-400">COORDINATES COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-3.5 h-3.5" />
                      <span>COPY LAT / LNG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setDirectionsLoc(null)}
                  className="text-xs font-sans uppercase font-bold text-bone-300 hover:text-bone-100"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
