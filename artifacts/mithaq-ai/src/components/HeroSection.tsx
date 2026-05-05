import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-grid-pattern">
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-teal-500/5 blur-[80px]" />
      </div>

      {/* Animated scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </div>

      {/* Logo area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="w-24 h-24 mx-auto rounded-2xl border border-cyan-500/30 bg-card flex items-center justify-center cyan-glow animate-float overflow-hidden">
          <img src="/logo.png" alt="Mithaq AI" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mb-6"
      >
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-2">
          <span className="gradient-text cyan-text-glow">ميثاق</span>
          <span className="text-foreground/30 mx-4 font-thin">|</span>
          <span className="gradient-text">MITHAQ AI</span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
          <span className="text-cyan-400/60 text-xs tracking-[0.3em] uppercase font-medium">Saudi Labor Law 2025</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-medium"
      >
        منظومة وكلاء ذكية لمراجعة العقود وضمان الامتثال وفق نظام العمل السعودي 2025
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <button
          onClick={onStartClick}
          className="group relative px-10 py-4 text-lg font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, hsl(186, 95%, 55%) 0%, hsl(199, 89%, 48%) 100%)",
            color: "hsl(222, 47%, 8%)",
            boxShadow: "0 0 30px rgba(0, 220, 220, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          <span className="relative z-10">ابدأ فحص العقد</span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
        </button>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-16 flex items-center gap-8 md:gap-16"
      >
        {[
          { value: "٣", label: "وكلاء ذكيين" },
          { value: "٩٦٪", label: "دقة الامتثال" },
          { value: "٣٠ث", label: "وقت التحليل" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-black gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">اكتشف المزيد</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-4 border-l-2 border-b-2 border-cyan-400/40 rotate-[-45deg]"
        />
      </motion.div>
    </section>
  );
}
