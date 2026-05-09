import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white pt-16">
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,168,107,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #F5F7FA)" }}
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
          className="mx-auto flex items-center justify-center animate-float bg-[#DDF7EA] rounded-3xl p-4"
          style={{ width: 160, height: 160 }}
        >
          <img
            src="/logo.png"
            alt="Mithaq AI"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
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
            border: "1px solid rgba(0,108,53,0.20)",
            background: "#DDF7EA",
            color: "#006C35",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-cyan"
            style={{ background: "#006C35" }}
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF7EA] text-[#006C35] text-xs font-bold mb-6 tracking-wider">
          PLATFORM
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-2">
          <span className="gradient-text">ميثاق</span>
          <span className="text-[#1A1A1A]/10 mx-4 font-thin">|</span>
          <span className="gradient-text">MITHAQ AI</span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#006C35]/20" />
          <span className="text-[#006C35] text-xs tracking-[0.3em] uppercase font-bold">
            Saudi Legal Engineering Platform
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#006C35]/20" />
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg md:text-xl text-[#4A5568] max-w-2xl leading-relaxed mb-12 font-medium"
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
          className="group px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 text-white"
          style={{
            backgroundColor: "#006C35",
            color: "#ffffff",
            boxShadow: "0 10px 25px -5px rgba(0, 108, 53, 0.25)",
          }}
        >
          <span className="relative z-10">ابدأ هندسة العقد</span>
          <div className="absolute inset-0 bg-[#005028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <span className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
          مجاني للنسخة التجريبية
        </span>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-[#E5E9EF] pt-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">100%</span>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mt-1">Compliance</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">2025</span>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mt-1">Legal Tech</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">Vision</span>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mt-1">2030 Ready</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold gradient-text">Saudi</span>
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-bold mt-1">Engineered</span>
        </div>
      </motion.div>
    </section>
  );
}
