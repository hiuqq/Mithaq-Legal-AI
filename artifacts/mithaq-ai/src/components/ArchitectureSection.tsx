import { motion } from "framer-motion";
import { ARCHITECTURE_NODES } from "@/data/mockData";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/2 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            البنية التقنية
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            معمارية النظام
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            تدفق آلي ومتسلسل من رفع العقد حتى إصدار تقرير الجاهزية الاستثمارية النهائي
          </p>
        </motion.div>

        {/* Flow diagram — desktop horizontal */}
        <div className="hidden md:flex items-center justify-between gap-2 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full origin-right"
              style={{
                background: "linear-gradient(90deg, hsl(158, 100%, 33%, 0.5) 0%, hsl(158, 100%, 33%, 0.1) 100%)",
              }}
            />
          </div>

          {ARCHITECTURE_NODES.map((node, index) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center gap-3 group"
            >
              {/* Node */}
              <div
                className="w-16 h-16 rounded-2xl border border-emerald-500/30 bg-card flex items-center justify-center text-2xl transition-all duration-300 group-hover:border-emerald-400/60"
                style={{
                  boxShadow: index === ARCHITECTURE_NODES.length - 1
                    ? "0 0 25px rgba(0, 168, 107, 0.3)"
                    : "0 0 10px rgba(0, 168, 107, 0.1)",
                }}
              >
                {node.icon}
              </div>

              {/* Arrow between nodes */}
              {index < ARCHITECTURE_NODES.length - 1 && (
                <div className="absolute top-8 -left-4 text-emerald-400/40 text-sm">←</div>
              )}

              {/* Label */}
              <span className="text-xs text-center text-foreground/80 font-medium max-w-[80px] leading-snug">
                {node.label}
              </span>

              {/* Step number */}
              <span className="text-[10px] text-emerald-400/40 font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Flow diagram — mobile vertical */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {ARCHITECTURE_NODES.map((node, index) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-4 py-3">
                <div className="w-12 h-12 rounded-xl border border-emerald-500/30 bg-card flex items-center justify-center text-xl">
                  {node.icon}
                </div>
                <span className="text-sm font-semibold text-foreground/80">{node.label}</span>
              </div>
              {index < ARCHITECTURE_NODES.length - 1 && (
                <div className="w-px h-6 bg-gradient-to-b from-emerald-400/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", title: "معالجة فورية", desc: "تحليل بنود العقد في ثوانٍ باستخدام الذكاء الاصطناعي" },
            { icon: "🔒", title: "امتثال كامل", desc: "مقارنة دقيقة مع نظام العمل السعودي 2025" },
            { icon: "📋", title: "تقارير احترافية", desc: "تقرير شامل مع المقترحات والسند القانوني" },
            { icon: "🔒", title: "تشفير تام", desc: "يتم تشفير بيانات العقد فور رفعه ولا يتم تخزين المعلومات الشخصية بعد انتهاء المعالجة" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border/50 bg-card/50 p-5 flex gap-4 items-start"
            >
              <span className="text-2xl">{card.icon}</span>
              <div>
                <div className="font-bold text-foreground text-sm mb-1">{card.title}</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{card.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
