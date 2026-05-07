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
    onResults(null, 0);
  };

  const runAnalysis = async () => {
    if (!selectedFile) return;
    setUploadState("analyzing");
    setCurrentStep(0);
    setCompletedSteps([]);
    const startTime = Date.now();

    // Animate through steps
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 1400));
      setCompletedSteps((prev) => [...prev, i]);
    }

    // Call the (mock) analyzeContract function
    // TODO: Pass the actual file to the real API when backend is ready
    const report = await analyzeContract(selectedFile);
    const timeSeconds = Math.round((Date.now() - startTime) / 1000);
    setUploadState("done");
    onResults(report, timeSeconds);
  };

  return (
    <section id="upload" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            رفع العقد
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            ابدأ التحليل
          </h2>
          <p className="text-muted-foreground text-lg">
            ارفع عقد العمل بصيغة PDF وسيتولى فريق الوكلاء مراجعته فورًا
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
          className={`
            relative rounded-2xl border-2 border-dashed p-14 text-center cursor-pointer
            transition-all duration-300
            ${dragOver
              ? "border-cyan-400 bg-cyan-400/5"
              : uploadState === "ready"
              ? "border-cyan-500/50 bg-cyan-500/5"
              : "border-border hover:border-cyan-500/40 hover:bg-cyan-500/3"
            }
            ${uploadState === "analyzing" ? "pointer-events-none" : ""}
          `}
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
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center text-4xl">
                  📄
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg mb-1">اسحب وأفلت ملف PDF هنا</p>
                  <p className="text-muted-foreground text-sm">أو انقر للاختيار من جهازك</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                  <span className="px-2 py-0.5 rounded border border-border/50 bg-muted/30">PDF</span>
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
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl">
                  ✅
                </div>
                <div>
                  <p className="text-cyan-400 font-bold">{selectedFile?.name}</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {selectedFile ? (selectedFile.size / 1024).toFixed(1) : 0} KB
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">انقر لتغيير الملف</p>
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
                <p className="text-foreground font-bold">
                  {uploadState === "done" ? "اكتمل التحليل!" : "جاري التحليل..."}
                </p>
                <p className="text-muted-foreground text-sm">{selectedFile?.name}</p>
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
              className="mt-8 rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="p-6">
                <h3 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider text-cyan-400/80">
                  مراحل التحليل
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
                          className={`
                            w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 transition-all duration-500
                            ${isCompleted
                              ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                              : isActive
                              ? "bg-cyan-500/10 border border-cyan-400/50 animate-pulse-cyan"
                              : "bg-muted/30 border border-border/50 opacity-40"
                            }
                          `}
                        >
                          {isCompleted ? "✓" : step.icon}
                        </div>

                        {/* Step label */}
                        <div className="flex-1">
                          <p
                            className={`font-medium text-sm transition-colors duration-300 ${
                              isCompleted
                                ? "text-cyan-400"
                                : isActive
                                ? "text-foreground"
                                : "text-muted-foreground/50"
                            }`}
                          >
                            {step.label}
                          </p>
                          {isActive && (
                            <div className="mt-1.5 h-1 rounded-full bg-muted/30 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Status badge */}
                        <div
                          className={`text-xs font-medium px-2 py-0.5 rounded-full transition-all duration-300 ${
                            isCompleted
                              ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
                              : isActive
                              ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                              : "text-transparent bg-transparent border border-transparent"
                          }`}
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

        {/* Analyze button */}
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
                className="px-12 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(186, 95%, 55%) 0%, hsl(199, 89%, 48%) 100%)",
                  color: "hsl(222, 47%, 8%)",
                  boxShadow: "0 0 30px rgba(0, 220, 220, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)",
                }}
              >
                تحليل العقد
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
                className="px-12 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(186, 95%, 55%) 0%, hsl(199, 89%, 48%) 100%)",
                  color: "hsl(222, 47%, 8%)",
                  boxShadow: "0 0 30px rgba(0, 220, 220, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)",
                }}
              >
                تحليل عقد جديد 🔄
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
