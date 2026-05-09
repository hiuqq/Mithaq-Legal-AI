import { motion } from "framer-motion";
import { AGENTS } from "@/data/mockData";

export function AgentsSection() {
  return (
    <section id="agents" className="py-24 px-6 relative" style={{ background: "#0F2A4D" }}>
      <div className="max-w-6xl mx-auto">
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
              border: "1px solid rgba(0,168,107,0.30)",
              background: "rgba(0,168,107,0.10)",
              color: "#00A86B",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
            الوكلاء الذكيون
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#E6F1FF" }}>
            منظومة الوكلاء
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#A8C4E0" }}>
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
              className="relative rounded-2xl p-8 overflow-hidden group card-hover"
              style={{
                border: "1px solid rgba(0,168,107,0.18)",
                background: "#0B1F3A",
                boxShadow: "0 4px 16px rgba(0,0,0,0.30)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: index === 2 ? "#C9A227" : "#00A86B" }}
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
                <h3 className="text-xl font-bold mb-1" style={{ color: "#E6F1FF" }}>{agent.name}</h3>
                <span className="text-xs font-medium tracking-wider uppercase mb-4 block" style={{ color: "#4A6A8A" }}>
                  {agent.nameEn}
                </span>

                {/* Description */}
                <p className="leading-relaxed text-sm" style={{ color: "#A8C4E0" }}>
                  {agent.description}
                </p>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                  <span className="text-xs font-medium" style={{ color: "#7A9BBF" }}>نشط • جاهز للتحليل</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
