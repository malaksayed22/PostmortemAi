"use client";
import { Zap } from "lucide-react";

export default function Navbar({ currentStep, currentView }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div className="leading-none">
            <span className="block text-sm font-bold tracking-tight text-white">
              PostMortem<span className="text-indigo-400"> AI</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-500 tracking-widest uppercase">
              Incident Analysis Studio
            </span>
          </div>
        </div>

        {currentView === "form" && (
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono text-xs text-slate-300">
              Step{" "}
              <span className="font-semibold text-white">{currentStep}</span>{" "}
              of 3
            </span>
          </div>
        )}

        {currentView === "loading" && (
          <div className="flex items-center gap-2 rounded-full border border-amber-900/50 bg-amber-950/30 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="font-mono text-xs text-amber-300">
              Generating...
            </span>
          </div>
        )}

        {currentView === "results" && (
          <div className="flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-emerald-300">
              Report Ready
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
