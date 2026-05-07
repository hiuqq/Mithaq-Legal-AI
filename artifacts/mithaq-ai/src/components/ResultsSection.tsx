import { motion } from "framer-motion";
import { ComplianceReport } from "@/data/mockData";

interface ResultsSectionProps {
  report: ComplianceReport;
  analysisTime: number;
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

export function ResultsSection({ report, analysisTime }: ResultsSectionProps) {
  const handleDownloadReport = () => {
    const date = new Date().toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const statusColor = (status: string) => {
      if (status === "مخالف") return "#f87171";
      if (status === "يحتاج تحسين") return "#fbbf24";
      return "#34d399";
    };

    const rowsHtml = report.rows
      .map(
        (row) => `
        <tr>
          <td>${row.originalClause}</td>
          <td><span class="badge" style="background:${statusColor(row.status)}22;color:${statusColor(row.status)};border:1px solid ${statusColor(row.status)}44">${row.status}</span></td>
          <td>${row.suggestedText}</td>
          <td><span class="ref">${row.legalRef}</span></td>
        </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تقرير الامتثال - ميثاق AI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
      background: #0d1526;
      color: #e2e8f0;
      padding: 40px 32px;
      direction: rtl;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e3a5f;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .brand { font-size: 28px; font-weight: 900; color: #00d4e8; }
    .brand span { color: #e2e8f0; }
    .date { font-size: 13px; color: #64748b; }
    .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
    .scores {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
    }
    .score-card {
      flex: 1;
      background: #111d35;
      border: 1px solid #1e3a5f;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
    }
    .score-value {
      font-size: 48px;
      font-weight: 900;
      color: #00d4e8;
    }
    .score-label { font-size: 13px; color: #64748b; margin-top: 8px; }
    .improvement {
      flex: 0.5;
      background: #111d35;
      border: 1px solid #1e3a5f;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .improvement-value {
      font-size: 32px;
      font-weight: 900;
      color: #34d399;
    }
    .improvement-label { font-size: 13px; color: #64748b; margin-top: 8px; }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #00d4e8;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #111d35;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #1e3a5f;
    }
    thead tr { background: #0d1a2e; }
    th {
      text-align: right;
      padding: 14px 20px;
      font-size: 12px;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #1e3a5f;
    }
    td {
      padding: 16px 20px;
      font-size: 14px;
      color: #cbd5e1;
      border-bottom: 1px solid #1a2d48;
      vertical-align: top;
      line-height: 1.6;
    }
    tr:last-child td { border-bottom: none; }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }
    .ref {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      background: #00d4e81a;
      color: #00d4e8;
      border: 1px solid #00d4e833;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #334155;
      border-top: 1px solid #1e3a5f;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand"><span>ميثاق </span>AI</div>
      <div class="subtitle">منظومة وكلاء ذكية لمراجعة العقود وفق نظام العمل السعودي 2025</div>
    </div>
    <div style="text-align:left">
      <div class="date">تاريخ التحليل: ${date}</div>
      <div class="date" style="margin-top:4px">الحالة: ${report.statusLabel}</div>
    </div>
  </div>

  <div class="scores">
    <div class="score-card">
      <div class="score-value">${report.scoreBefore}٪</div>
      <div class="score-label">درجة الامتثال قبل التحسين</div>
    </div>
    <div class="improvement">
      <div class="improvement-value">+${report.scoreAfter - report.scoreBefore}٪</div>
      <div class="improvement-label">نسبة التحسين</div>
    </div>
    <div class="score-card">
      <div class="score-value">${report.scoreAfter}٪</div>
      <div class="score-label">درجة الامتثال بعد التحسين</div>
    </div>
  </div>

  <div class="section-title">تفاصيل البنود</div>
  <table>
    <thead>
      <tr>
        <th>البند الأصلي</th>
        <th>الحالة</th>
        <th>الصياغة المقترحة</th>
        <th>السند القانوني</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>

  <div class="footer">
    تقرير صادر عن ميثاق AI • نسخة تجريبية — Hackathon Demo v1.0
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mithaq-compliance-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadRevised = () => {
    const date = new Date().toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const clausesHtml = report.rows
      .map((row, i) => {
        const isRevised = row.status !== "متوافق";
        return `
        <div class="clause">
          <div class="clause-num">البند ${i + 1}</div>
          ${
            isRevised
              ? `
            <div class="clause-original">
              <span class="clause-tag original-tag">النص الأصلي</span>
              <p>${row.originalClause}</p>
            </div>
            <div class="clause-revised">
              <span class="clause-tag revised-tag">النص المعدّل ✓</span>
              <p>${row.suggestedText}</p>
              <span class="ref">${row.legalRef}</span>
            </div>`
              : `
            <div class="clause-ok">
              <span class="clause-tag ok-tag">متوافق ✓</span>
              <p>${row.originalClause}</p>
            </div>`
          }
        </div>`;
      })
      .join("");

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>العقد المعدّل - ميثاق AI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
      background: #0d1526;
      color: #e2e8f0;
      padding: 40px 32px;
      direction: rtl;
      line-height: 1.7;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e3a5f;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .brand { font-size: 26px; font-weight: 900; color: #00d4e8; }
    .brand span { color: #e2e8f0; }
    .meta { font-size: 13px; color: #64748b; text-align: left; }
    .meta div { margin-top: 4px; }
    .notice {
      background: #0a2a1a;
      border: 1px solid #34d39944;
      border-radius: 10px;
      padding: 14px 20px;
      margin-bottom: 28px;
      font-size: 13px;
      color: #34d399;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .contract-title {
      font-size: 20px;
      font-weight: 900;
      color: #f1f5f9;
      margin-bottom: 24px;
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 1px solid #1e3a5f;
    }
    .clause {
      margin-bottom: 24px;
      background: #111d35;
      border: 1px solid #1e3a5f;
      border-radius: 12px;
      overflow: hidden;
    }
    .clause-num {
      font-size: 12px;
      font-weight: 700;
      color: #00d4e8;
      padding: 10px 20px;
      background: #0d1a2e;
      border-bottom: 1px solid #1e3a5f;
      letter-spacing: 0.05em;
    }
    .clause-original, .clause-revised, .clause-ok {
      padding: 16px 20px;
    }
    .clause-original {
      border-bottom: 1px solid #1e3a5f;
      background: #1a0d0d;
    }
    .clause-original p { color: #fca5a5; text-decoration: line-through; opacity: 0.7; margin-top: 8px; }
    .clause-revised { background: #0a1a0d; }
    .clause-revised p { color: #86efac; margin-top: 8px; }
    .clause-ok { }
    .clause-ok p { color: #94a3b8; margin-top: 8px; }
    .clause-tag {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .original-tag { background: #f871711a; color: #f87171; border: 1px solid #f8717133; }
    .revised-tag { background: #34d3991a; color: #34d399; border: 1px solid #34d39933; }
    .ok-tag { background: #00d4e81a; color: #00d4e8; border: 1px solid #00d4e833; }
    .ref {
      display: inline-block;
      margin-top: 10px;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      background: #00d4e81a;
      color: #00d4e8;
      border: 1px solid #00d4e833;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #334155;
      border-top: 1px solid #1e3a5f;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand"><span>ميثاق </span>AI</div>
      <div style="font-size:13px;color:#64748b;margin-top:4px">العقد المعدّل وفق نظام العمل السعودي 2025</div>
    </div>
    <div class="meta">
      <div>تاريخ التعديل: ${date}</div>
      <div>درجة الامتثال: ${report.scoreAfter}٪</div>
    </div>
  </div>

  <div class="notice">
    ✅ تم تطبيق جميع التعديلات المقترحة من وكيل الصياغة على هذا العقد.
    البنود المشطوبة هي النصوص الأصلية المخالفة، والبنود الخضراء هي الصياغة المعتمدة.
  </div>

  <div class="contract-title">عقد العمل — النسخة المعدّلة</div>

  ${clausesHtml}

  <div class="footer">
    عقد معدّل بواسطة ميثاق AI • نسخة تجريبية — Hackathon Demo v1.0
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mithaq-revised-contract-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
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

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: "٤", label: "وكلاء ذكيين" },
            { value: `${report.scoreAfter}٪`, label: "دقة الامتثال" },
            { value: `${analysisTime}ث`, label: "وقت التحليل" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

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

        </motion.div>
      </div>
    </motion.section>
  );
}
