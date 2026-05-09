import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16"
      style={{ background: "#0B1F3A" }}
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,168,107,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #0B1F3A)" }}
        />
      </div>

      {/* Logo area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8"
      >
        <div
          className="mx-auto flex items-center justify-center animate-float rounded-3xl p-4"
          style={{
            width: 160,
            height: 160,
            background: "rgba(0,168,107,0.12)",
            border: "1px solid rgba(0,168,107,0.25)",
            boxShadow: "0 0 40px rgba(0,168,107,0.15)",
          }}
        >
          <img
            src="/logo.png"
            alt="Mithaq AI"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{
            border: "1px solid rgba(0,168,107,0.35)",
            background: "rgba(0,168,107,0.10)",
            color: "#00A86B",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-cyan"
            style={{ background: "#00A86B" }}
          />
          Saudi Legal Engineering Platform
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-5"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wider"
          style={{ background: "rgba(0,168,107,0.10)", color: "#00A86B", border: "1px solid rgba(0,168,107,0.25)" }}
        >
          PLATFORM
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-2">
          <span className="gradient-text">ميثاق</span>
          <span className="mx-4 font-thin" style={{ color: "rgba(230,241,255,0.10)" }}>|</span>
          <span className="gradient-text">MITHAQ AI</span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[rgba(0,168,107,0.40)]" />
          <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: "#00A86B" }}>
            Saudi Legal Engineering Platform
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[rgba(0,168,107,0.40)]" />
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-medium"
        style={{ color: "#A8C4E0" }}
      >
        منظومة هندسة قانونية تعيد تصميم العقود وسعودتها لضمان الامتثال النظامي والجاهزية الاستثمارية في المملكة
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
      >
        <button
          onClick={onStartClick}
          className="group relative px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 text-white overflow-hidden"
          style={{
            backgroundColor: "#00A86B",
            boxShadow: "0 10px 30px -5px rgba(0,168,107,0.45)",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#008558"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00A86B"; }}
        >
          <span className="relative z-10">ابدأ هندسة العقد</span>
        </button>
        <span className="text-sm font-medium" style={{ color: "#4A6A8A" }}>
          مجاني للنسخة التجريبية
        </span>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-10"
        style={{ borderTop: "1px solid rgba(0,168,107,0.15)" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">100%</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: "#4A6A8A" }}>Compliance</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">2025</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: "#4A6A8A" }}>Legal Tech</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">Vision</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: "#4A6A8A" }}>2030 Ready</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">Saudi</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1" style={{ color: "#4A6A8A" }}>Engineered</span>
        </div>
      </motion.div>
    </section>
  );
}
