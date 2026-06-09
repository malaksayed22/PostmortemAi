"use client";
import {
  FieldLabel,
  FieldGroup,
  TextInput,
  TextareaInput,
} from "@/components/ui/FormFields";
import { ChevronLeft, Sparkles, Loader2, ChevronDown } from "lucide-react";
import { OPENAI_MODELS } from "@/lib/constants";

export default function Step3({ formData, updateField, onBack, onGenerate, errors, isLoading, selectedModel, onModelChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <FieldGroup>
          <FieldLabel htmlFor="commander" required>
            Incident Commander
          </FieldLabel>
          <TextInput
            id="commander"
            value={formData.commander}
            onChange={(e) => updateField("commander", e.target.value)}
            placeholder="Name and role, e.g. Jane Smith — SRE Lead"
            error={errors.commander}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="team">Team Members Involved</FieldLabel>
          <TextareaInput
            id="team"
            value={formData.team}
            onChange={(e) => updateField("team", e.target.value)}
            placeholder={`List names and roles, one per line:\nAlex Chen — Backend Engineer\nSarah Patel — DBA`}
            rows={3}
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="immediateActions" required>
            Immediate Actions Taken
          </FieldLabel>
          <TextareaInput
            id="immediateActions"
            value={formData.immediateActions}
            onChange={(e) => updateField("immediateActions", e.target.value)}
            placeholder="What did the team do to resolve the incident?"
            rows={4}
            error={errors.immediateActions}
          />
        </FieldGroup>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldGroup>
            <FieldLabel htmlFor="wentWell">What Went Well</FieldLabel>
            <TextareaInput
              id="wentWell"
              value={formData.wentWell}
              onChange={(e) => updateField("wentWell", e.target.value)}
              placeholder="What parts of your response worked effectively?"
              rows={3}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="wentPoorly">What Went Poorly</FieldLabel>
            <TextareaInput
              id="wentPoorly"
              value={formData.wentPoorly}
              onChange={(e) => updateField("wentPoorly", e.target.value)}
              placeholder="What slowed you down or made things worse?"
              rows={3}
            />
          </FieldGroup>
        </div>

        <FieldGroup>
          <FieldLabel htmlFor="additionalContext">Additional Context</FieldLabel>
          <TextareaInput
            id="additionalContext"
            value={formData.additionalContext}
            onChange={(e) => updateField("additionalContext", e.target.value)}
            placeholder="Any other details relevant to the postmortem..."
            rows={3}
          />
        </FieldGroup>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-150 hover:border-slate-600 hover:text-white active:scale-95 disabled:opacity-50 sm:w-auto sm:justify-start"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {/* Split button: model selector + generate */}
        <div className="flex w-full items-stretch overflow-hidden rounded-lg shadow-lg shadow-indigo-500/20 sm:w-auto">
          {/* Model dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              disabled={isLoading}
              className="h-full w-full appearance-none rounded-l-lg border border-indigo-500/60 bg-slate-800 pl-3 pr-8 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {OPENAI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
          </div>

          {/* Divider */}
          <div className="w-px bg-indigo-500/40" />

          {/* Generate button */}
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-r-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Postmortem</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
