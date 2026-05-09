import { motion } from "framer-motion";
import { ARCHITECTURE_NODES } from "@/data/mockData";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-6 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#006C35]/20 bg-[#DDF7EA] text-[#006C35] text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006C35] animate-pulse" />
            البنية التقنية
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            معمارية النظام
          </h2>
          <p className="text-[#4A5568] text-lg max-w-xl mx-auto">
            تدفق آلي ومتسلسل من رفع العقد حتى إصدار تقرير الجاهزية الاستثمارية النهائي
          </p>
        </motion.div>

        {/* Flow — desktop */}
        <div className="hidden md:flex items-center justify-between gap-2 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full origin-right"
              style={{
                background: "linear-gradient(90deg, #006C35 0%, rgba(0, 168, 107, 0.20) 100%)",
              }}
            />
          </div>

          {ARCHITECTURE_NODES.map((node, index) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="relative z-10 flex flex-col items-center gap-3 group"
            >
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl transition-all duration-300 bg-white"
                style={{
                  borderColor: index === ARCHITECTURE_NODES.length - 1 ? "#006C35" : "#E5E9EF",
                  borderWidth: index === ARCHITECTURE_NODES.length - 1 ? "2px" : "1.5px",
                  boxShadow: index === ARCHITECTURE_NODES.length - 1
                    ? "0 4px 16px rgba(0,108,53,0.18)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {node.icon}
              </div>

              {index < ARCHITECTURE_NODES.length - 1 && (
                <div className="absolute top-8 -left-4 text-[#006C35] text-sm font-bold">←</div>
              )}

              {/* Label */}
              <span className="text-xs text-center text-[#1A1A1A] font-bold max-w-[80px] leading-snug">
                {node.label}
              </span>

              {/* Step number */}
              <span className="text-[10px] text-[#006C35]/40 font-mono font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Flow — mobile */}
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
                <div 
                  className="w-12 h-12 rounded-xl border flex items-center justify-center text-xl bg-white"
                  style={{
                    borderColor: index === ARCHITECTURE_NODES.length - 1 ? "#006C35" : "#E5E9EF",
                    borderWidth: index === ARCHITECTURE_NODES.length - 1 ? "2px" : "1.5px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                  }}
                >
                  {node.icon}
                </div>
                <span className="text-sm font-bold text-[#1A1A1A]">{node.label}</span>
              </div>
              {index < ARCHITECTURE_NODES.length - 1 && (
                <div 
                  className="w-[2px] h-6" 
                  style={{ background: "linear-gradient(to bottom, #006C35, rgba(0,168,107,0.20))" }}
                />
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
            { icon: "⚡", title: "هندسة العقود", desc: "إعادة هيكلة وصياغة العقود وفق معايير النظام السعودي" },
            { icon: "🇸🇦", title: "سعودة العقود", desc: "تحويل البنود الأجنبية إلى صياغات سعودية معتمدة" },
            { icon: "📈", title: "الجاهزية الاستثمارية", desc: "تقرير شامل يقيّم جاهزية العقد للاستثمار الأجنبي" },
            { icon: "🔒", title: "تشفير تام", desc: "بياناتك مشفرة ولا يتم تخزين العقود بعد المعالجة" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#E5E9EF] bg-white p-5 flex gap-4 items-start shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[#DDF7EA] flex items-center justify-center flex-shrink-0 text-xl">
                {card.icon}
              </div>
              <div>
                <div className="font-bold text-[#1A1A1A] text-sm mb-1">{card.title}</div>
                <div className="text-[#6B7280] text-xs leading-relaxed">{card.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
