"use client";
import {
  AlertCircle,
  Clock,
  Search,
  BarChart2,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  CheckSquare,
  Shield,
  FileText,
} from "lucide-react";

const ICON_MAP = {
  AlertCircle,
  Clock,
  Search,
  BarChart2,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  CheckSquare,
  Shield,
  FileText,
};

function parseContent(content) {
  const lines = content.split("\n").filter(Boolean);
  const elements = [];
  let listBuffer = [];
  let listType = null;

  function flushList() {
    if (listBuffer.length === 0) return;
    if (listType === "ol") {
      elements.push(
        <ol key={elements.length} className="ml-4 space-y-1.5 list-decimal list-outside">
          {listBuffer.map((item, i) => (
            <li key={i} className="text-sm text-slate-300 leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    } else {
      elements.push(
        <ul key={elements.length} className="ml-4 space-y-1.5 list-disc list-outside">
          {listBuffer.map((item, i) => (
            <li key={i} className="text-sm text-slate-300 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    listBuffer = [];
    listType = null;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Numbered list
    const numMatch = trimmed.match(/^\d+[\.\)]\s+(.+)/);
    if (numMatch) {
      if (listType !== "ol") { flushList(); listType = "ol"; }
      listBuffer.push(numMatch[1]);
      continue;
    }

    // Bullet list
    const bulletMatch = trimmed.match(/^[-•*]\s+(.+)/);
    if (bulletMatch) {
      if (listType !== "ul") { flushList(); listType = "ul"; }
      listBuffer.push(bulletMatch[1]);
      continue;
    }

    // Timestamp line (timeline)
    const timeMatch = trimmed.match(/^(\d{2}:\d{2}(?:\s+UTC)?)\s*[—–-]\s*(.+)/i);
    if (timeMatch) {
      flushList();
      elements.push(
        <div key={elements.length} className="flex items-start gap-3 py-1">
          <span className="shrink-0 font-mono text-xs font-semibold text-amber-400 pt-0.5 w-20">
            {timeMatch[1]}
          </span>
          <span className="text-sm text-slate-300 leading-relaxed">{timeMatch[2]}</span>
        </div>
      );
      continue;
    }

    // "Why N:" lines (5 Whys)
    const whyMatch = trimmed.match(/^(Why \d+:)\s*(.+)/i);
    if (whyMatch) {
      flushList();
      elements.push(
        <div key={elements.length} className="py-1">
          <span className="font-mono text-xs font-semibold text-orange-400">{whyMatch[1]} </span>
          <span className="text-sm text-slate-300">{whyMatch[2]}</span>
        </div>
      );
      continue;
    }

    // Key-value line (Impact Assessment style)
    const kvMatch = trimmed.match(/^([A-Za-z ]+):\s*(.+)/);
    if (kvMatch && kvMatch[1].length < 30) {
      flushList();
      elements.push(
        <div key={elements.length} className="flex items-start gap-2 py-0.5">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {kvMatch[1]}:
          </span>
          <span className="text-sm text-slate-300">{kvMatch[2]}</span>
        </div>
      );
      continue;
    }

    // Plain text paragraph
    flushList();
    elements.push(
      <p key={elements.length} className="text-sm text-slate-300 leading-relaxed">
        {trimmed}
      </p>
    );
  }

  flushList();
  return elements;
}

export default function SectionCard({ section, index }) {
  const IconComponent = ICON_MAP[section.icon] || FileText;

  return (
    <div
      className={`section-card card-glow overflow-hidden rounded-xl border-l-4 bg-slate-800/50 border border-slate-700/50 transition-all duration-300 ${section.color}`}
      style={{
        animationDelay: `${index * 100}ms`,
        background: `linear-gradient(135deg, ${section.bgGlow} 0%, rgba(15,23,42,0) 60%), rgba(30,41,59,0.5)`,
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 border-b border-slate-700/50 px-5 py-4">
        <div className={`rounded-lg p-1.5 bg-slate-800 ${section.iconColor}`}>
          <IconComponent className="h-4 w-4" />
        </div>
        <h3 className="font-mono text-sm font-bold tracking-wide text-white">
          {section.title}
        </h3>
      </div>

      {/* Card content */}
      <div className="space-y-2 px-5 py-4">{parseContent(section.content)}</div>
    </div>
  );
}
