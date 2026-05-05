import { motion } from "framer-motion";
import { AGENTS } from "@/data/mockData";

export function AgentsSection() {
  return (
    <section id="agents" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            الوكلاء الذكيون
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            منظومة الوكلاء
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            ثلاثة وكلاء متخصصون يعملون بالتوازي لضمان أعلى مستويات الامتثال القانوني
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl border ${agent.borderColor} bg-card p-8 card-hover overflow-hidden`}
              style={{
                background: `linear-gradient(145deg, hsl(222, 42%, 11%) 0%, hsl(222, 42%, 13%) 100%)`,
              }}
            >
              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-60 rounded-2xl`}
              />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden rounded-tl-2xl">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-cyan-400/10 rounded-full" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-5 w-16 h-16 rounded-xl bg-background/50 border border-white/5 flex items-center justify-center">
                  {agent.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-foreground mb-1">{agent.name}</h3>
                <span className="text-xs text-cyan-400/60 font-medium tracking-wider uppercase mb-4 block">
                  {agent.nameEn}
                </span>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {agent.description}
                </p>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs text-cyan-400/70 font-medium">نشط • جاهز للتحليل</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
