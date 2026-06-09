import { SYSTEM_PROMPT, SECTION_META } from "./constants";

export function buildUserMessage(formData) {
  return `INCIDENT TITLE: ${formData.title}
TYPE: ${formData.type}
DATE/TIME: ${formData.dateTime} — Resolved: ${formData.resolvedAt}
DESCRIPTION: ${formData.description}
SYSTEMS AFFECTED: ${formData.systems}
USERS AFFECTED: ${formData.usersAffected}
BUSINESS IMPACT: ${formData.businessImpact}
TIMELINE: ${formData.timeline}
PREVIOUSLY SEEN: ${formData.previouslySeen} ${formData.previousDetails || ""}
INCIDENT COMMANDER: ${formData.commander}
TEAM: ${formData.team}
IMMEDIATE ACTIONS: ${formData.immediateActions}
WHAT WENT WELL: ${formData.wentWell}
WHAT WENT POORLY: ${formData.wentPoorly}
ADDITIONAL CONTEXT: ${formData.additionalContext}`;
}

export async function generatePostmortem(formData, model = "gpt-4o") {
  const userMessage = buildUserMessage(formData);

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMessage, model }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || `Server error ${response.status}`);
  }

  if (!data.text) {
    throw new Error("Unexpected response format from server.");
  }

  return data.text;
}

export function parseReport(rawText) {
  // Split by ### headers
  const parts = rawText.split(/\n###\s+/).filter(Boolean);
  const sections = [];

  for (const part of parts) {
    const newlineIdx = part.indexOf("\n");
    if (newlineIdx === -1) continue;
    const title = part.slice(0, newlineIdx).trim();
    const content = part.slice(newlineIdx + 1).trim();
    const meta = SECTION_META[title] || {
      icon: "FileText",
      color: "border-slate-500",
      iconColor: "text-slate-400",
      bgGlow: "rgba(100,116,139,0.05)",
    };
    sections.push({ title, content, ...meta });
  }

  return sections;
}

export function detectSeverity(sections) {
  const execSummary = sections.find((s) => s.title === "Executive Summary");
  if (!execSummary) return "P2";
  const text = execSummary.content;
  if (/Severity:\s*P1/i.test(text)) return "P1";
  if (/Severity:\s*P3/i.test(text)) return "P3";
  return "P2";
}

export function validateStep(step, formData) {
  const errors = {};

  if (step === 1) {
    if (!formData.title.trim()) errors.title = "Incident title is required.";
    if (!formData.type) errors.type = "Please select an incident type.";
    if (!formData.description.trim())
      errors.description = "Brief description is required.";
  }

  if (step === 2) {
    if (!formData.systems.trim())
      errors.systems = "Systems affected is required.";
    if (!formData.timeline.trim())
      errors.timeline = "Incident timeline is required.";
  }

  if (step === 3) {
    if (!formData.commander.trim())
      errors.commander = "Incident commander is required.";
    if (!formData.immediateActions.trim())
      errors.immediateActions = "Immediate actions taken is required.";
  }

  return errors;
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
