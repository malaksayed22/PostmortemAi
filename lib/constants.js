export const SYSTEM_PROMPT = `You are a senior DevOps engineer and SRE (Site Reliability Engineer) with expertise in writing professional incident postmortem reports. The user will provide details about a production incident. You must respond with a structured Postmortem Report in the following EXACT format using these exact section headers (use ### for headers):

### Executive Summary
[2-3 sentence overview of the incident. Start with "Severity: P1", "Severity: P2", or "Severity: P3" on its own line based on the impact — P1 for critical/widespread, P2 for significant/partial, P3 for minor/limited. Then summarize what happened, duration, and business impact.]

### Incident Timeline
[Chronological list of events with timestamps. If timestamps were provided use them; if not, reconstruct a plausible timeline based on the description. Format each entry as: HH:MM UTC — Event description]

### Root Cause Analysis
[Clear explanation of the primary root cause. Use the 5 Whys technique — show each "Why" level. End with a concise one-sentence root cause statement.]

### Impact Assessment
[Breakdown of: Users affected, Systems impacted, Duration, Business impact (revenue, SLA, reputation), Data integrity status]

### Contributing Factors
[Bullet list of 3-5 factors that contributed to the incident or made it worse — e.g. monitoring gaps, process failures, configuration drift, knowledge silos]

### What Went Well
[Bullet list of things the team did effectively during the incident response]

### What Went Poorly
[Bullet list of things that slowed response or made the incident worse]

### Action Items
[Numbered list of 5-7 concrete action items. Each item must have: Owner role, Priority (High/Medium/Low), and Deadline (e.g. Within 1 week / Within 1 month)]

### Prevention Plan
[3-4 strategic recommendations to prevent this class of incident in the future. Each recommendation should include the approach and expected outcome.]

Respond ONLY with the document. No preamble, no explanation, no markdown code fences. Use plain ### headers exactly as shown.`;

export const OPENAI_MODELS = [
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini" },
  { id: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

export const INCIDENT_TYPES = [
  "Database Failure",
  "Deployment Failure",
  "Network Outage",
  "Security Breach",
  "Performance Degradation",
  "Third-party Service Failure",
  "Data Loss",
  "Other",
];

export const BUSINESS_IMPACT_OPTIONS = [
  "Revenue Loss",
  "SLA Breach",
  "Reputational Risk",
  "Data Loss",
  "Compliance Risk",
  "Operational Disruption",
];

export const PRESETS = [
  {
    label: "Database Outage",
    icon: "🗄️",
    data: {
      title: "Production PostgreSQL Database Unresponsive — June 2024",
      type: "Database Failure",
      description:
        "The primary production PostgreSQL database became completely unresponsive at 02:14 UTC, causing all API endpoints to return 503 errors. The issue affected 100% of users for 47 minutes before failover to the read replica was completed. Root cause was a runaway vacuum process that consumed all available I/O.",
    },
  },
  {
    label: "Failed Deployment",
    icon: "🚀",
    data: {
      title: "Broken CI/CD Deployment Took Down Payment Service",
      type: "Deployment Failure",
      description:
        "A misconfigured Kubernetes rolling update caused the payment microservice to deploy with a missing environment variable, resulting in all payment processing failing silently. The issue went undetected for 23 minutes due to a gap in alerting coverage. Approximately 340 transactions were affected.",
    },
  },
  {
    label: "Security Breach",
    icon: "🔓",
    data: {
      title: "Exposed S3 Bucket — Customer PII Data Accessible Publicly",
      type: "Security Breach",
      description:
        "A misconfigured AWS S3 bucket containing customer PII (names, emails, partial payment info) was inadvertently made public during an infrastructure-as-code refactor. The bucket was publicly accessible for approximately 6 hours before automated scanning detected the misconfiguration and triggered an alert.",
    },
  },
];

export const SECTION_META = {
  "Executive Summary": {
    icon: "AlertCircle",
    color: "border-red-500",
    iconColor: "text-red-400",
    bgGlow: "rgba(239,68,68,0.05)",
  },
  "Incident Timeline": {
    icon: "Clock",
    color: "border-amber-500",
    iconColor: "text-amber-400",
    bgGlow: "rgba(245,158,11,0.05)",
  },
  "Root Cause Analysis": {
    icon: "Search",
    color: "border-orange-500",
    iconColor: "text-orange-400",
    bgGlow: "rgba(249,115,22,0.05)",
  },
  "Impact Assessment": {
    icon: "BarChart2",
    color: "border-rose-500",
    iconColor: "text-rose-400",
    bgGlow: "rgba(244,63,94,0.05)",
  },
  "Contributing Factors": {
    icon: "GitBranch",
    color: "border-purple-500",
    iconColor: "text-purple-400",
    bgGlow: "rgba(168,85,247,0.05)",
  },
  "What Went Well": {
    icon: "ThumbsUp",
    color: "border-emerald-500",
    iconColor: "text-emerald-400",
    bgGlow: "rgba(16,185,129,0.05)",
  },
  "What Went Poorly": {
    icon: "ThumbsDown",
    color: "border-slate-500",
    iconColor: "text-slate-400",
    bgGlow: "rgba(100,116,139,0.05)",
  },
  "Action Items": {
    icon: "CheckSquare",
    color: "border-indigo-500",
    iconColor: "text-indigo-400",
    bgGlow: "rgba(99,102,241,0.05)",
  },
  "Prevention Plan": {
    icon: "Shield",
    color: "border-teal-500",
    iconColor: "text-teal-400",
    bgGlow: "rgba(20,184,166,0.05)",
  },
};

export const LOADING_STEPS = [
  "Reconstructing incident timeline",
  "Analyzing root causes",
  "Identifying contributing factors",
  "Drafting action items",
  "Compiling prevention plan",
];

export const INITIAL_FORM_DATA = {
  title: "",
  type: "",
  dateTime: "",
  resolvedAt: "",
  description: "",
  systems: "",
  usersAffected: "",
  businessImpact: "",
  timeline: "",
  previouslySeen: "No",
  previousDetails: "",
  commander: "",
  team: "",
  immediateActions: "",
  wentWell: "",
  wentPoorly: "",
  additionalContext: "",
};
