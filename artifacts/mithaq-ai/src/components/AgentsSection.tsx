import { motion } from "framer-motion";
import { AGENTS } from "@/data/mockData";

export function AgentsSection() {
  return (
    <section id="agents" className="py-24 px-6 relative" style={{ background: "#050810" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(0,168,107,0.07) 0%, transparent 70%)" }}
        />
      </div>

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
            الوكلاء الذكيون
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#EBF0FC" }}>
            منظومة الوكلاء
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7A90B5" }}>
            المحلل القانوني، مهندس الصياغة السعودية، محلل المخاطر المالية، والدرع القضائي — يعملون بالتوازي لهندسة عقدك
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative rounded-2xl p-8 overflow-hidden group card-hover cursor-default"
              style={{
                background: "rgba(13, 18, 36, 0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: index === 2 ? "#C9A227" : "linear-gradient(90deg, #006C35, #00A86B)" }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(0,168,107,0.06) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="text-4xl mb-5 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(0,168,107,0.12)",
                    border: "1px solid rgba(0,168,107,0.20)",
                  }}
                >
                  {agent.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-1" style={{ color: "#EBF0FC" }}>{agent.name}</h3>
                <span className="text-xs font-medium tracking-wider uppercase mb-4 block" style={{ color: "#4A6080" }}>
                  {agent.nameEn}
                </span>

                {/* Description */}
                <p className="leading-relaxed text-sm" style={{ color: "#7A90B5" }}>
                  {agent.description}
                </p>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#00A86B", boxShadow: "0 0 6px #00A86B" }}
                  />
                  <span className="text-xs font-medium" style={{ color: "#4A6080" }}>نشط • جاهز للتحليل</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
