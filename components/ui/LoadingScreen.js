"use client";
import { LOADING_STEPS } from "@/lib/constants";
import { Check } from "lucide-react";

export default function LoadingScreen({ loadingStep }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      {/* Animated icon */}
      <div className="relative mb-10">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping" />
        <div className="absolute -inset-4 rounded-full border border-indigo-500/10 animate-pulse" />

        {/* Shield SVG */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-950/60 shadow-xl shadow-indigo-500/20">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
          >
            <path
              d="M20 4L6 10v10c0 8.5 5.9 16.4 14 18.7C28.1 36.4 34 28.5 34 20V10L20 4z"
              className="fill-indigo-600/40 stroke-indigo-400"
              strokeWidth="1.5"
            />
            <path
              d="M14 20l4 4 8-8"
              className="stroke-indigo-300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h2 className="mb-2 font-mono text-xl font-bold text-white">
        Generating postmortem report...
      </h2>
      <p className="mb-10 text-sm text-slate-500">
        OpenAI is analyzing your incident data
      </p>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3">
        {LOADING_STEPS.map((step, i) => {
          const isDone = loadingStep > i;
          const isActive = loadingStep === i;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-500 ${
                isDone
                  ? "border-emerald-800/50 bg-emerald-950/30"
                  : isActive
                  ? "border-indigo-700/50 bg-indigo-950/40"
                  : "border-slate-800 bg-slate-900/30 opacity-40"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-600"
                }`}
              >
                {isDone ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : isActive ? (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                ) : (
                  <span className="font-mono text-[10px]">{i + 1}</span>
                )}
              </div>
              <span
                className={`font-mono text-sm transition-colors duration-300 ${
                  isDone
                    ? "text-emerald-400"
                    : isActive
                    ? "text-indigo-300"
                    : "text-slate-600"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
