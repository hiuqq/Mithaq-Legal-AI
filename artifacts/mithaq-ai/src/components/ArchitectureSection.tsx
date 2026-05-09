import { motion } from "framer-motion";
import { ARCHITECTURE_NODES } from "@/data/mockData";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 px-6 relative overflow-hidden" style={{ background: "#070917" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,168,107,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              border: "1px solid rgba(0,200,122,0.20)",
              background: "rgba(0,168,107,0.10)",
              color: "#00C87A",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00A86B" }} />
            البنية التقنية
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#EBF0FC" }}>
            معمارية النظام
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7A90B5" }}>
            تدفق آلي ومتسلسل من رفع العقد حتى إصدار تقرير الجاهزية الاستثمارية النهائي
          </p>
        </motion.div>

        {/* Flow — desktop */}
        <div className="hidden md:flex items-center justify-between gap-2 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-[2px] z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full origin-right"
              style={{
                background: "linear-gradient(90deg, rgba(0,168,107,0.70) 0%, rgba(0,168,107,0.10) 100%)",
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
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300"
                style={{
                  background: index === ARCHITECTURE_NODES.length - 1
                    ? "rgba(0,168,107,0.18)"
                    : "rgba(13, 18, 36, 0.95)",
                  border: index === ARCHITECTURE_NODES.length - 1
                    ? "2px solid rgba(0,168,107,0.50)"
                    : "1.5px solid rgba(255,255,255,0.08)",
                  boxShadow: index === ARCHITECTURE_NODES.length - 1
                    ? "0 0 24px rgba(0,168,107,0.25)"
                    : "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                {node.icon}
              </div>

              {index < ARCHITECTURE_NODES.length - 1 && (
                <div className="absolute top-8 -left-4 text-sm font-bold" style={{ color: "#00A86B" }}>←</div>
              )}

              {/* Label */}
              <span className="text-xs text-center font-bold max-w-[80px] leading-snug" style={{ color: "#EBF0FC" }}>
                {node.label}
              </span>

              {/* Step number */}
              <span className="text-[10px] font-mono font-bold" style={{ color: "rgba(0,168,107,0.35)" }}>
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: index === ARCHITECTURE_NODES.length - 1
                      ? "rgba(0,168,107,0.18)"
                      : "rgba(13,18,36,0.95)",
                    border: index === ARCHITECTURE_NODES.length - 1
                      ? "2px solid rgba(0,168,107,0.45)"
                      : "1.5px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {node.icon}
                </div>
                <span className="text-sm font-bold" style={{ color: "#EBF0FC" }}>{node.label}</span>
              </div>
              {index < ARCHITECTURE_NODES.length - 1 && (
                <div
                  className="w-[2px] h-6"
                  style={{ background: "linear-gradient(to bottom, rgba(0,168,107,0.70), rgba(0,168,107,0.10))" }}
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
              className="rounded-xl p-5 flex gap-4 items-start"
              style={{
                background: "rgba(13,18,36,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.18)" }}
              >
                {card.icon}
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: "#EBF0FC" }}>{card.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#4A6080" }}>{card.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
