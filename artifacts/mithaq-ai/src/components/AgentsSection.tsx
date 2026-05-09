import { motion } from "framer-motion";
import { AGENTS } from "@/data/mockData";

export function AgentsSection() {
  return (
    <section id="agents" className="py-24 px-6 relative bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-[#DDF7EA] text-[#006C35] text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
            الوكلاء الذكيون
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
            منظومة الوكلاء
          </h2>
          <p className="text-[#4A5568] text-lg max-w-xl mx-auto">
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
              className="relative rounded-2xl border border-[#E5E9EF] bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              {/* Top accent bar */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 ${index === 2 ? 'bg-[#C9A227]' : 'bg-[#006C35]'}`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-5 w-16 h-16 rounded-xl bg-[#DDF7EA] flex items-center justify-center">
                  {agent.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{agent.name}</h3>
                <span className="text-xs text-[#6B7280] font-medium tracking-wider uppercase mb-4 block">
                  {agent.nameEn}
                </span>

                {/* Description */}
                <p className="text-[#4A5568] leading-relaxed text-sm">
                  {agent.description}
                </p>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                  <span className="text-xs text-[#4A5568] font-medium">نشط • جاهز للتحليل</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
