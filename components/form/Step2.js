"use client";
import { BUSINESS_IMPACT_OPTIONS } from "@/lib/constants";
import {
  FieldLabel,
  FieldGroup,
  TextInput,
  NumberInput,
  SelectInput,
  TextareaInput,
} from "@/components/ui/FormFields";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Step2({ formData, updateField, onBack, onNext, errors }) {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <FieldGroup>
          <FieldLabel htmlFor="systems" required>
            Systems Affected
          </FieldLabel>
          <TextInput
            id="systems"
            value={formData.systems}
            onChange={(e) => updateField("systems", e.target.value)}
            placeholder="e.g. Payment API, User Auth Service, Admin Dashboard"
            error={errors.systems}
          />
        </FieldGroup>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldGroup>
            <FieldLabel htmlFor="usersAffected">Users Affected</FieldLabel>
            <NumberInput
              id="usersAffected"
              value={formData.usersAffected}
              onChange={(e) => updateField("usersAffected", e.target.value)}
              placeholder="e.g. 12000"
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="businessImpact">Business Impact</FieldLabel>
            <SelectInput
              id="businessImpact"
              value={formData.businessImpact}
              onChange={(e) => updateField("businessImpact", e.target.value)}
              options={BUSINESS_IMPACT_OPTIONS}
              placeholder="Select impact type..."
            />
          </FieldGroup>
        </div>

        <FieldGroup>
          <FieldLabel htmlFor="timeline" required>
            Incident Timeline
          </FieldLabel>
          <TextareaInput
            id="timeline"
            value={formData.timeline}
            onChange={(e) => updateField("timeline", e.target.value)}
            placeholder={`List key events with timestamps, e.g.:\n02:14 UTC - First alert fired in PagerDuty\n02:19 UTC - On-call engineer acknowledged\n02:31 UTC - Root cause identified...`}
            rows={6}
            error={errors.timeline}
          />
        </FieldGroup>

        {/* Previously seen */}
        <FieldGroup>
          <FieldLabel>Was this incident previously seen?</FieldLabel>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2.5">
                <div className="relative">
                  <input
                    type="radio"
                    name="previouslySeen"
                    value={option}
                    checked={formData.previouslySeen === option}
                    onChange={(e) => updateField("previouslySeen", e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-all duration-150 ${
                      formData.previouslySeen === option
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-slate-600 bg-slate-800"
                    }`}
                  >
                    {formData.previouslySeen === option && (
                      <div className="absolute inset-0.5 rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-300">{option}</span>
              </label>
            ))}
          </div>
        </FieldGroup>

        {formData.previouslySeen === "Yes" && (
          <FieldGroup>
            <FieldLabel htmlFor="previousDetails">
              When and what was done previously?
            </FieldLabel>
            <TextareaInput
              id="previousDetails"
              value={formData.previousDetails}
              onChange={(e) => updateField("previousDetails", e.target.value)}
              placeholder="Describe the previous occurrence and actions taken..."
              rows={3}
            />
          </FieldGroup>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-150 hover:border-slate-600 hover:text-white active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
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
