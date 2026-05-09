import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeContract } from "@/lib/analyzeContract";
import { ANALYSIS_STEPS } from "@/data/mockData";
import { ComplianceReport } from "@/data/mockData";

interface UploadSectionProps {
  onResults: (report: ComplianceReport | null, timeSeconds: number) => void;
}

type UploadState = "idle" | "ready" | "analyzing" | "done";

export function UploadSection({ onResults }: UploadSectionProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      setSelectedFile(file);
      setUploadState("ready");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const resetAnalysis = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    setAnalysisError(null);
    onResults(null, 0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const runAnalysis = async () => {
    if (!selectedFile) return;
    setUploadState("analyzing");
    setAnalysisError(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    const startTime = Date.now();

    const animationPromise = (async () => {
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, 1400));
        setCompletedSteps((prev) => [...prev, i]);
      }
    })();

    let report = null;
    let apiError: string | null = null;
    try {
      [, report] = await Promise.all([animationPromise, analyzeContract(selectedFile)]);
    } catch (err) {
      await animationPromise;
      apiError = err instanceof Error ? err.message : String(err);
    }

    if (apiError || !report) {
      setAnalysisError(apiError ?? "فشل التحليل — الرجاء المحاولة مجدداً");
      setUploadState("ready");
      return;
    }

    const timeSeconds = Math.round((Date.now() - startTime) / 1000);
    setUploadState("done");
    onResults(report, timeSeconds);
  };

  const dropzoneBorderColor = dragOver
    ? "rgba(0,200,122,0.60)"
    : uploadState === "ready"
    ? "rgba(0,168,107,0.45)"
    : "rgba(255,255,255,0.08)";

  const dropzoneBg = dragOver
    ? "rgba(0,168,107,0.08)"
    : uploadState === "ready"
    ? "rgba(0,168,107,0.05)"
    : "rgba(13,18,36,0.6)";

  return (
    <section className="py-24 px-6" style={{ background: "#0A0F1E" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              border: "1px solid rgba(0,200,122,0.20)",
              background: "rgba(0,168,107,0.10)",
              color: "#00C87A",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00A86B" }} />
            رفع العقد
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#EBF0FC" }}>
            ابدأ الهندسة القانونية
          </h2>
          <p className="text-lg" style={{ color: "#7A90B5" }}>
            ارفع عقدك بصيغة PDF وسيتولى فريق الوكلاء هندسته وسعودته وتقييم جاهزيته الاستثمارية
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => uploadState !== "analyzing" && fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-14 text-center cursor-pointer transition-all duration-300 ${uploadState === "analyzing" ? "pointer-events-none" : ""}`}
          style={{
            borderColor: dropzoneBorderColor,
            background: dropzoneBg,
            boxShadow: dragOver ? "0 0 0 4px rgba(0,168,107,0.12), 0 8px 32px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.35)",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleInputChange}
          />

          <AnimatePresence mode="wait">
            {uploadState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background: "rgba(0,168,107,0.10)",
                    border: "1px solid rgba(0,168,107,0.18)",
                  }}
                >
                  📄
                </div>
                <div>
                  <p className="font-bold text-lg mb-1" style={{ color: "#EBF0FC" }}>
                    اسحب وأفلت ملف PDF هنا
                  </p>
                  <p className="text-sm" style={{ color: "#4A6080" }}>
                    أو انقر للاختيار من جهازك
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#3A5070" }}>
                  <span
                    className="px-2 py-0.5 rounded font-medium"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    PDF
                  </span>
                  <span>حتى 10 ميغابايت</span>
                </div>
              </motion.div>
            )}

            {uploadState === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.22)" }}
                >
                  ✅
                </div>
                <div>
                  <p className="font-bold" style={{ color: "#00C87A" }}>{selectedFile?.name}</p>
                  <p className="text-sm mt-1" style={{ color: "#4A6080" }}>
                    {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0} KB
                  </p>
                </div>
                <p className="text-xs" style={{ color: "#3A5070" }}>انقر لتغيير الملف</p>
              </motion.div>
            )}

            {(uploadState === "analyzing" || uploadState === "done") && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-4xl mb-2">
                  {uploadState === "done" ? "✅" : "🤖"}
                </div>
                <p className="font-bold" style={{ color: "#EBF0FC" }}>
                  {uploadState === "done" ? "اكتملت الهندسة القانونية!" : "جاري هندسة العقد..."}
                </p>
                <p className="text-sm" style={{ color: "#4A6080" }}>{selectedFile?.name}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Analysis steps */}
        <AnimatePresence>
          {(uploadState === "analyzing" || uploadState === "done") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(13,18,36,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div className="p-6">
                <h3
                  className="font-bold mb-5 text-xs uppercase tracking-wider"
                  style={{ color: "#00A86B" }}
                >
                  مراحل الهندسة القانونية
                </h3>
                <div className="space-y-4">
                  {ANALYSIS_STEPS.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    const isActive = currentStep === index && !isCompleted;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4"
                      >
                        {/* Step indicator */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 transition-all duration-500"
                          style={{
                            background: isCompleted
                              ? "rgba(0,168,107,0.18)"
                              : isActive
                              ? "rgba(0,168,107,0.10)"
                              : "rgba(255,255,255,0.03)",
                            border: isCompleted
                              ? "1.5px solid rgba(0,168,107,0.40)"
                              : isActive
                              ? "1.5px solid rgba(0,168,107,0.30)"
                              : "1.5px solid rgba(255,255,255,0.06)",
                            color: isCompleted ? "#00C87A" : "#4A6080",
                            opacity: isCompleted || isActive ? 1 : 0.5,
                            boxShadow: isCompleted ? "0 0 12px rgba(0,168,107,0.20)" : "none",
                          }}
                        >
                          {isCompleted ? "✓" : step.icon}
                        </div>

                        {/* Label */}
                        <div className="flex-1">
                          <p
                            className="font-medium text-sm transition-colors duration-300"
                            style={{
                              color: isCompleted
                                ? "#00C87A"
                                : isActive
                                ? "#EBF0FC"
                                : "#3A5070",
                            }}
                          >
                            {step.label}
                          </p>
                          {isActive && (
                            <div
                              className="mt-1.5 h-1 rounded-full overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: "linear-gradient(to left, #C9A227, #00A86B)" }}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Badge */}
                        <div
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full transition-all duration-300"
                          style={{
                            color: isCompleted
                              ? "#00C87A"
                              : isActive
                              ? "#C9A227"
                              : "transparent",
                            background: isCompleted
                              ? "rgba(0,168,107,0.15)"
                              : isActive
                              ? "rgba(201,162,39,0.12)"
                              : "transparent",
                            border: isCompleted
                              ? "1px solid rgba(0,168,107,0.25)"
                              : isActive
                              ? "1px solid rgba(201,162,39,0.25)"
                              : "1px solid transparent",
                          }}
                        >
                          {isCompleted ? "مكتمل" : isActive ? "جاري..." : ""}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error banner */}
        <AnimatePresence>
          {analysisError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 rounded-xl px-5 py-4 text-right"
              style={{
                border: "1px solid rgba(220,38,38,0.35)",
                background: "rgba(220,38,38,0.10)",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(analysisError ?? "").then(() => {
                      const btn = document.getElementById("copy-err-btn");
                      if (btn) { btn.textContent = "✓ تم النسخ"; setTimeout(() => { btn.textContent = "نسخ"; }, 2000); }
                    });
                  }}
                  id="copy-err-btn"
                  className="text-xs font-medium px-3 py-1 rounded-lg transition-colors"
                  style={{
                    border: "1px solid rgba(220,38,38,0.35)",
                    color: "#F87171",
                    background: "rgba(220,38,38,0.08)",
                  }}
                >
                  نسخ
                </button>
                <p className="font-bold text-sm" style={{ color: "#F87171" }}>⚠️ فشل الاتصال بـ LangFlow</p>
              </div>
              <p className="text-xs font-mono break-all" style={{ color: "#FCA5A5" }}>{analysisError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <AnimatePresence>
          {uploadState === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-center"
            >
              <button
                onClick={runAnalysis}
                className="px-12 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 text-white"
                style={{
                  background: "linear-gradient(135deg, #006C35, #00A86B)",
                  boxShadow: "0 8px 32px rgba(0,168,107,0.35)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 40px rgba(0,168,107,0.55)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(0,168,107,0.35)"; }}
              >
                هندسة العقد
              </button>
            </motion.div>
          )}
          {uploadState === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-center"
            >
              <button
                onClick={resetAnalysis}
                className="px-12 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 text-white"
                style={{
                  background: "linear-gradient(135deg, #006C35, #00A86B)",
                  boxShadow: "0 8px 32px rgba(0,168,107,0.35)",
                }}
              >
                هندسة عقد جديد ↺
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
