"use client";
import { useState, useCallback } from "react";
import { INITIAL_FORM_DATA, LOADING_STEPS } from "@/lib/constants";
import { generatePostmortem, parseReport, detectSeverity, validateStep } from "@/lib/utils";

import Navbar from "@/components/ui/Navbar";
import StepProgress from "@/components/ui/StepProgress";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Step1 from "@/components/form/Step1";
import Step2 from "@/components/form/Step2";
import Step3 from "@/components/form/Step3";
import ResultsHeader from "@/components/results/ResultsHeader";
import SectionCard from "@/components/results/SectionCard";
import ErrorCard from "@/components/results/ErrorCard";

export default function PostMortemApp() {
  const [currentView, setCurrentView] = useState("form"); // 'form' | 'loading' | 'results'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [errors, setErrors] = useState({});
  const [parsedSections, setParsedSections] = useState([]);
  const [generatedReport, setGeneratedReport] = useState("");
  const [severityLevel, setSeverityLevel] = useState("P2");
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  function goToStep(step) {
    setCurrentStep(step);
  }

  function handleNextStep(step) {
    const validationErrors = validateStep(step, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setCurrentStep(step + 1);
  }

  async function handleGenerate() {
    const validationErrors = validateStep(3, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setError(null);
    setCurrentView("loading");
    setLoadingStep(0);

    // Animate loading steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < LOADING_STEPS.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
      }
    }, 1200);

    try {
      const rawText = await generatePostmortem(formData, selectedModel);
      clearInterval(interval);
      setLoadingStep(LOADING_STEPS.length);
      setGeneratedReport(rawText);

      const sections = parseReport(rawText);
      setParsedSections(sections);
      setSeverityLevel(detectSeverity(sections));
      setCurrentView("results");
    } catch (err) {
      clearInterval(interval);
      setError(err.message || "An unexpected error occurred.");
      setCurrentView("results"); // Show results view with error card
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setParsedSections([]);
    setGeneratedReport("");
    setSeverityLevel("P2");
    setLoadingStep(0);
    setError(null);
    setCurrentView("form");
    setCurrentStep(1);
  }

  async function handleDownload() {
    if (!generatedReport || parsedSections.length === 0) return;

    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentW = pageW - margin * 2;
    let y = margin;

    function checkPageBreak(needed = 10) {
      if (y + needed > pageH - margin) {
        doc.addPage();
        y = margin;
      }
    }

    // Header bar
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageW, 18, "F");
    doc.setFontSize(11);
    doc.setTextColor(165, 180, 252);
    doc.setFont("helvetica", "bold");
    doc.text("PostMortem AI — Incident Report", margin, 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    doc.text(dateStr, pageW - margin - doc.getTextWidth(dateStr), 12);

    y = 28;

    // Incident title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(248, 250, 252);
    const titleLines = doc.splitTextToSize(formData.title || "Postmortem Report", contentW);
    doc.setTextColor(30, 30, 50);
    doc.setTextColor(15, 23, 42);
    // Actually use a dark text on white background
    doc.setTextColor(17, 24, 39);
    titleLines.forEach((line) => {
      doc.text(line, margin, y);
      y += 8;
    });

    // Severity badge
    const sevColors = { P1: [220, 38, 38], P2: [217, 119, 6], P3: [37, 99, 235] };
    const [r, g, b] = sevColors[severityLevel] || sevColors.P2;
    doc.setFillColor(r, g, b);
    doc.roundedRect(margin, y, 28, 7, 2, 2, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(severityLevel, margin + 14, y + 4.8, { align: "center" });
    y += 14;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // Sections
    parsedSections.forEach((section) => {
      checkPageBreak(20);

      // Section title
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y - 4, contentW, 10, "F");
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 41, 59);
      doc.text(section.title, margin + 3, y + 3);
      y += 12;

      // Section content — split into lines
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);

      const rawLines = section.content.split("\n");
      rawLines.forEach((raw) => {
        const wrapped = doc.splitTextToSize(raw || " ", contentW - 4);
        wrapped.forEach((wline) => {
          checkPageBreak(6);
          const isBullet = wline.trimStart().startsWith("-") || wline.trimStart().startsWith("•");
          doc.text(wline, margin + (isBullet ? 5 : 3), y);
          y += 5.5;
        });
      });

      y += 6;

      // Section divider
      checkPageBreak(4);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
    });

    // Footer on every page
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(`Generated by PostMortem AI · Page ${p} of ${totalPages}`, pageW / 2, pageH - 10, { align: "center" });
    }

    const slug = (formData.title || "report").replace(/[^a-z0-9]/gi, "-").toLowerCase().slice(0, 50);
    doc.save(`postmortem-${slug}.pdf`);
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <Navbar currentStep={currentStep} currentView={currentView} />

        {/* FORM VIEW */}
        {currentView === "form" && (
          <main className="mx-auto max-w-2xl px-4 py-8">
            <StepProgress currentStep={currentStep} />

            {/* Form card */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
              {/* Step heading */}
              <div className="mb-6">
                <h1 className="font-mono text-lg font-bold text-white">
                  {currentStep === 1 && "Incident Details"}
                  {currentStep === 2 && "Impact & Timeline"}
                  {currentStep === 3 && "Team & Actions"}
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                  {currentStep === 1 &&
                    "Describe the incident — what happened and when."}
                  {currentStep === 2 &&
                    "Quantify the blast radius and document the chronology."}
                  {currentStep === 3 &&
                    "Record who was involved and how the team responded."}
                </p>
              </div>

              {currentStep === 1 && (
                <Step1
                  formData={formData}
                  updateField={updateField}
                  onNext={() => handleNextStep(1)}
                  errors={errors}
                />
              )}
              {currentStep === 2 && (
                <Step2
                  formData={formData}
                  updateField={updateField}
                  onBack={() => goToStep(1)}
                  onNext={() => handleNextStep(2)}
                  errors={errors}
                />
              )}
              {currentStep === 3 && (
                <Step3
                  formData={formData}
                  updateField={updateField}
                  onBack={() => goToStep(2)}
                  onGenerate={handleGenerate}
                  errors={errors}
                  isLoading={isSubmitting}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
              )}
            </div>
          </main>
        )}

        {/* LOADING VIEW */}
        {currentView === "loading" && (
          <main className="mx-auto max-w-2xl px-4 py-8">
            <LoadingScreen loadingStep={loadingStep} />
          </main>
        )}

        {/* RESULTS VIEW */}
        {currentView === "results" && (
          <>
            <ResultsHeader
              severityLevel={severityLevel}
              onDownload={handleDownload}
              onReset={handleReset}
              sectionCount={parsedSections.length}
            />

            <main className="mx-auto max-w-5xl px-4 py-8">
              {error ? (
                <ErrorCard message={error} onRetry={handleReset} />
              ) : (
                <div className="space-y-4">
                  {parsedSections.map((section, i) => (
                    <SectionCard key={section.title} section={section} index={i} />
                  ))}

                  {parsedSections.length === 0 && (
                    <div className="py-16 text-center text-slate-500">
                      No sections found in the generated report.
                    </div>
                  )}
                </div>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
}
