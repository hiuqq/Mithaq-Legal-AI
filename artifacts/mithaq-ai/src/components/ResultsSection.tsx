import { motion } from "framer-motion";
import { ComplianceReport } from "@/data/mockData";

interface ResultsSectionProps {
  report: ComplianceReport;
}

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "مخالف": {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  "يحتاج تحسين": {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  "متوافق": {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
};

function ScoreCircle({ score, label, delay }: { score: number; label: string; delay: number }) {
  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="url(#cyanGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(186, 95%, 55%)" />
              <stop offset="100%" stopColor="hsl(199, 89%, 48%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black gradient-text">{score}٪</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </motion.div>
  );
}

export function ResultsSection({ report }: ResultsSectionProps) {
  const handleDownloadReport = () => {
    // TODO: Connect to real PDF generation API
    // await fetch('/api/contracts/report/download', { method: 'GET' });
    alert("سيتم ربط هذا الزر بخدمة توليد التقارير لاحقًا");
  };

  const handleDownloadRevised = () => {
    // TODO: Connect to real revised contract download API
    // await fetch('/api/contracts/revised/download', { method: 'GET' });
    alert("سيتم ربط هذا الزر بخدمة تحميل العقد المعدل لاحقًا");
  };

  const handleSendForReview = () => {
    // TODO: Connect to real review workflow API
    // await fetch('/api/contracts/send-review', { method: 'POST', body: JSON.stringify({ contractId }) });
    alert("سيتم ربط هذا الزر بخدمة الإرسال للمراجعة لاحقًا");
  };

  return (
    <motion.section
      id="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6 relative"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            تقرير الامتثال
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            نتائج التحليل
          </h2>
          <p className="text-muted-foreground text-lg">
            تم اكتشاف المخالفات وتقديم الصياغات البديلة المتوافقة مع النظام
          </p>
        </div>

        {/* Score comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-card p-8 mb-8 cyan-glow"
        >
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground mb-8">
            مؤشر الامتثال
          </h3>

          <div className="flex items-center justify-center gap-12 md:gap-24">
            <ScoreCircle score={report.scoreBefore} label="قبل التحسين" delay={0} />

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-2xl text-cyan-400">←</div>
              <span className="text-xs text-muted-foreground">تحسن</span>
              <div
                className="text-lg font-black"
                style={{ background: "linear-gradient(135deg, #00dcdc, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                +{report.scoreAfter - report.scoreBefore}٪
              </div>
            </motion.div>

            <ScoreCircle score={report.scoreAfter} label="بعد التحسين" delay={0.2} />
          </div>

          {/* Status badge */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">
              <span>✓</span>
              الحالة: {report.statusLabel}
            </span>
          </div>
        </motion.div>

        {/* Compliance table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground">تفاصيل البنود</h3>
            <span className="text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
              {report.rows.length} بنود مراجعة
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="text-right px-6 py-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">البند الأصلي</th>
                  <th className="text-right px-6 py-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">الحالة</th>
                  <th className="text-right px-6 py-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">الصياغة المقترحة</th>
                  <th className="text-right px-6 py-4 font-bold text-muted-foreground text-xs uppercase tracking-wider">السند القانوني</th>
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row, index) => {
                  const colors = STATUS_COLORS[row.status] ?? STATUS_COLORS["متوافق"];
                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border-b border-border/30 hover:bg-muted/10 transition-colors"
                    >
                      <td className="px-6 py-5 text-foreground/80 font-medium">{row.originalClause}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${colors.text} ${colors.bg} ${colors.border}`}>
                          {row.status === "مخالف" && "✗"}
                          {row.status === "يحتاج تحسين" && "!"}
                          {row.status === "متوافق" && "✓"}
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-foreground/70 leading-relaxed">{row.suggestedText}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {row.legalRef}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 p-4">
            {report.rows.map((row, index) => {
              const colors = STATUS_COLORS[row.status] ?? STATUS_COLORS["متوافق"];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="rounded-xl border border-border/50 bg-muted/10 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-bold text-sm">{row.originalClause}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors.text} ${colors.bg} ${colors.border}`}>
                      {row.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{row.suggestedText}</p>
                  <span className="inline-block text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-lg">
                    {row.legalRef}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(186, 95%, 55%) 0%, hsl(199, 89%, 48%) 100%)",
              color: "hsl(222, 47%, 8%)",
              boxShadow: "0 0 20px rgba(0, 220, 220, 0.25)",
            }}
          >
            <span>📥</span>
            تحميل التقرير
          </button>

          <button
            onClick={handleDownloadRevised}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 transition-all duration-300 hover:bg-cyan-500/10 hover:scale-105"
          >
            <span>📄</span>
            تحميل العقد المعدل
          </button>

          <button
            onClick={handleSendForReview}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-border text-muted-foreground bg-card transition-all duration-300 hover:border-cyan-500/30 hover:text-cyan-400 hover:scale-105"
          >
            <span>📨</span>
            إرسال للمراجعة
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
