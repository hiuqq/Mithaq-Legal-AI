import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { AgentsSection } from "@/components/AgentsSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ComplianceReport } from "@/data/mockData";

export default function Home() {
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResults = (r: ComplianceReport) => {
    setReport(r);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header / Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{ width: 44, height: 44 }}>
              <img
                src="/logo.png"
                alt="Mithaq AI"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 8px rgba(0,210,230,0.6))",
                }}
              />
            </div>
            <span className="font-black text-foreground text-lg tracking-tight">
              ميثاق <span className="text-cyan-400">AI</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#upload" className="hover:text-cyan-400 transition-colors">رفع العقد</a>
            <a href="#agents" className="hover:text-cyan-400 transition-colors">الوكلاء</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">المعمارية</a>
          </nav>

          {/* CTA */}
          <button
            onClick={scrollToUpload}
            className="text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(186, 95%, 55%) 0%, hsl(199, 89%, 48%) 100%)",
              color: "hsl(222, 47%, 8%)",
            }}
          >
            ابدأ الآن
          </button>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Hero */}
        <HeroSection onStartClick={scrollToUpload} />

        {/* Upload */}
        <div ref={uploadRef} id="upload-section">
          <UploadSection onResults={handleResults} />
        </div>

        {/* Agents */}
        <AgentsSection />

        {/* Architecture */}
        <ArchitectureSection />

        {/* Results — shown after analysis */}
        <AnimatePresence>
          {report && (
            <motion.div
              ref={resultsRef}
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsSection report={report} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-black text-xs" style={{ fontFamily: 'Cairo, sans-serif' }}>م</span>
            </div>
            <span className="font-black text-foreground">ميثاق <span className="text-cyan-400">AI</span></span>
          </div>
          <p className="text-muted-foreground text-sm">
            منظومة وكلاء ذكية لمراجعة العقود وفق نظام العمل السعودي 2025
          </p>
          <p className="text-muted-foreground/40 text-xs mt-3">
            نسخة تجريبية — Hackathon Demo v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
