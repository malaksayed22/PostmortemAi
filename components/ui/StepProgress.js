"use client";
import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Incident Details", shortLabel: "Details" },
  { number: 2, label: "Impact & Timeline", shortLabel: "Impact" },
  { number: 3, label: "Team & Actions", shortLabel: "Actions" },
];

export default function StepProgress({ currentStep }) {
  return (
    <div className="relative flex items-center justify-between px-2 py-6">
      {/* Connector lines */}
      <div className="absolute left-0 right-0 top-1/2 mx-16 flex -translate-y-1/2">
        {/* Line 1 */}
        <div className="flex-1">
          <div
            className={`h-0.5 w-full transition-all duration-500 ${
              currentStep > 1 ? "bg-emerald-500" : "bg-slate-700"
            }`}
          />
        </div>
        {/* Line 2 */}
        <div className="flex-1">
          <div
            className={`h-0.5 w-full transition-all duration-500 ${
              currentStep > 2 ? "bg-emerald-500" : "bg-slate-700"
            }`}
          />
        </div>
      </div>

      {STEPS.map((step) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isUpcoming = currentStep < step.number;

        return (
          <div key={step.number} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-300 ${
                isCompleted
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : isActive
                  ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "border-slate-700 bg-slate-800 text-slate-500"
              }`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 stroke-[3]" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-medium tracking-wide transition-colors duration-300 text-center max-w-[64px] sm:max-w-none leading-tight ${
                isActive
                  ? "text-indigo-300"
                  : isCompleted
                  ? "text-emerald-400"
                  : "text-slate-600"
              }`}
            >
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.shortLabel}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
