"use client";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorCard({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-red-800/50 bg-red-950/20 p-8 text-center">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-700/50 bg-red-900/30">
          <AlertTriangle className="h-7 w-7 text-red-400" />
        </div>
      </div>
      <h3 className="mb-2 font-mono text-lg font-bold text-red-300">
        Generation Failed
      </h3>
      <p className="mb-6 text-sm text-slate-400">
        {message || "An unexpected error occurred while contacting the OpenAI API."}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
