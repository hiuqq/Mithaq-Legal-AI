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
  const [analysisTime, setAnalysisTime] = useState<number>(0);
  const uploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResults = (r: ComplianceReport | null, t: number) => {
    setReport(r);
    setAnalysisTime(t);
    if (r) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navbar — dark navy, sticky */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{
          background: "rgba(11,31,58,0.92)",
          borderBottom: "1px solid rgba(0,168,107,0.18)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.40)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{ width: 40, height: 40 }}>
              <img
                src="/logo.png"
                alt="Mithaq AI"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-lg" style={{ color: "#E6F1FF" }}>
                ميثاق{" "}
                <span style={{ color: "#00A86B" }}>AI</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase" style={{ color: "#4A6A8A" }}>
                Saudi Legal Engineering
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "#7A9BBF" }}>
            {[
              { href: "#upload-section", label: "رفع العقد" },
              { href: "#agents", label: "الوكلاء" },
              { href: "#architecture", label: "المعمارية" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200"
                style={{ color: "inherit" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00A86B")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={scrollToUpload}
            className="text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 text-white"
            style={{
              background: "#00A86B",
              boxShadow: "0 4px 18px rgba(0,168,107,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#008558"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#00A86B"; }}
          >
            ابدأ الآن
          </button>
        </div>
      </header>

      {/* Page content */}
      <main>
        <HeroSection onStartClick={scrollToUpload} />

        <div ref={uploadRef} id="upload-section">
          <UploadSection onResults={handleResults} />

          <AnimatePresence>
            {report && (
              <motion.div
                ref={resultsRef}
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <ResultsSection report={report} analysisTime={analysisTime} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AgentsSection />
        <ArchitectureSection />
      </main>

      {/* Footer */}
      <footer style={{ background: "#0F2A4D", borderTop: "1px solid rgba(0,168,107,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div style={{ width: 30, height: 30 }}>
              <img
                src="/logo.png"
                alt="Mithaq AI"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <span className="font-black" style={{ color: "#E6F1FF" }}>
              ميثاق{" "}
              <span style={{ color: "#00A86B" }}>AI</span>
            </span>
          </div>
          <p className="text-sm mb-1" style={{ color: "#7A9BBF" }}>
            Saudi Legal Engineering Platform — هندسة قانونية لعقود جاهزة للاستثمار
          </p>
          <p className="text-xs" style={{ color: "#2A4A6A" }}>
            نسخة تجريبية — Hackathon Demo v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
