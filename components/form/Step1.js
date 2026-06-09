"use client";
import { PRESETS, INCIDENT_TYPES } from "@/lib/constants";
import {
  FieldLabel,
  FieldGroup,
  TextInput,
  SelectInput,
  DateTimeInput,
  TextareaInput,
} from "@/components/ui/FormFields";
import { ChevronRight } from "lucide-react";

export default function Step1({ formData, updateField, onNext, errors }) {
  function applyPreset(preset) {
    updateField("title", preset.data.title);
    updateField("type", preset.data.type);
    updateField("description", preset.data.description);
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Quick Fill — Example Presets
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className="flex shrink-0 flex-col items-start gap-1 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-left transition-all duration-150 hover:border-indigo-600/60 hover:bg-slate-800 w-[130px] sm:w-auto sm:shrink"
            >
              <span className="text-base">{preset.icon}</span>
              <span className="text-xs font-semibold text-slate-300 leading-tight">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-800" />

      {/* Fields */}
      <div className="space-y-5">
        <FieldGroup>
          <FieldLabel htmlFor="title" required>
            Incident Title
          </FieldLabel>
          <TextInput
            id="title"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder='e.g. Production database outage — 2024-06-01'
            error={errors.title}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="type" required>
            Incident Type
          </FieldLabel>
          <SelectInput
            id="type"
            value={formData.type}
            onChange={(e) => updateField("type", e.target.value)}
            options={INCIDENT_TYPES}
            placeholder="Select incident type..."
            error={errors.type}
          />
        </FieldGroup>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldGroup>
            <FieldLabel htmlFor="dateTime">Date & Time of Incident</FieldLabel>
            <DateTimeInput
              id="dateTime"
              value={formData.dateTime}
              onChange={(e) => updateField("dateTime", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="resolvedAt">Date & Time Resolved</FieldLabel>
            <DateTimeInput
              id="resolvedAt"
              value={formData.resolvedAt}
              onChange={(e) => updateField("resolvedAt", e.target.value)}
            />
          </FieldGroup>
        </div>

        <FieldGroup>
          <FieldLabel htmlFor="description" required>
            Brief Description
          </FieldLabel>
          <TextareaInput
            id="description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe what happened in 2-3 sentences..."
            rows={4}
            error={errors.description}
          />
        </FieldGroup>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-150 hover:bg-indigo-500 active:scale-95"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
