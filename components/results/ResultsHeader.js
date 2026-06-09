"use client";
import { Zap, RotateCcw, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

const SEVERITY_CONFIG = {
  P1: {
    label: "P1 — Critical",
    dot: "🔴",
    className: "badge-p1 border-red-700/50 bg-red-950/50 text-red-300",
  },
  P2: {
    label: "P2 — Major",
    dot: "🟡",
    className: "badge-p2 border-amber-700/50 bg-amber-950/50 text-amber-300",
  },
  P3: {
    label: "P3 — Minor",
    dot: "🔵",
    className: "badge-p3 border-blue-700/50 bg-blue-950/50 text-blue-300",
  },
};

export default function ResultsHeader({
  severityLevel,
  onDownload,
  onReset,
  sectionCount,
}) {
  const sev = SEVERITY_CONFIG[severityLevel] || SEVERITY_CONFIG.P2;

  return (
    <>
      {/* Sticky action bar */}
      <div className="sticky top-14 z-40 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          {/* Left: Logo mini */}
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-400" />
            <span className="hidden sm:inline font-mono text-sm font-bold text-slate-300">
              Postmortem Report
            </span>
          </div>

          {/* Center: Severity badge */}
          <div
            className={`rounded-full border px-2 py-1 sm:px-4 font-mono text-xs font-bold tracking-wide ${sev.className}`}
          >
            {sev.dot} {sev.label}
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-slate-300 transition-all duration-150 hover:border-slate-600 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Incident</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-700 bg-indigo-900/50 px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-indigo-300 transition-all duration-150 hover:bg-indigo-800/50"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-slate-800/50 bg-slate-900/30">
        <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-2 sm:gap-4">
          {[
            { icon: "📋", label: `${sectionCount} Sections` },
            { icon: "⚡", label: "AI Generated" },
            { icon: "🛡️", label: "DevOps Grade" },
            { icon: "📅", label: formatDate() },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-700/50 bg-slate-800/40 px-3 py-1 text-xs text-slate-400"
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
