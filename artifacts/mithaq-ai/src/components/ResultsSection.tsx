import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComplianceReport } from "@/data/mockData";

interface ResultsSectionProps {
  report: ComplianceReport;
  analysisTime: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  "مخالف":        { label: "مخالف",        color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", icon: "✗" },
  "يحتاج تحسين": { label: "يحتاج تحسين", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", icon: "!" },
  "متوافق":       { label: "متوافق",       color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", icon: "✓" },
};

function ScoreCircle({
  score,
  label,
  delay,
  gradientId,
  colorStart,
  colorEnd,
}: {
  score: number;
  label: string;
  delay: number;
  gradientId: string;
  colorStart: string;
  colorEnd: string;
}) {
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
          <circle cx="40" cy="40" r="36" fill="none" stroke="#F3F4F6" strokeWidth="6" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorStart} />
              <stop offset="100%" stopColor={colorEnd} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black gradient-text">{score}٪</span>
        </div>
      </div>
      <span
        className="text-xs font-semibold text-center max-w-[110px] leading-snug"
        style={{ color: "#4A5568" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function AgentSummaryPanel({ summary }: { summary: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-border bg-card overflow-hidden mb-8"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full p-5 flex items-center justify-between text-right hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🤖</span>
          <span className="font-bold text-foreground text-sm">تفاصيل تحليل الوكلاء</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground text-xs"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="summary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border/50">
              <pre className="mt-4 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans">
                {summary}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      if (status === "مخالف") return "#DC2626";
      if (status === "يحتاج تحسين") return "#D97706";
      return "#059669";
    };

    const rowsHtml = report.rows
      .map(
        (row) => `
        <tr>
          <td>${row.originalClause}</td>
          <td><span class="badge" style="background:${statusColor(row.status)}15;color:${statusColor(row.status)};border:1px solid ${statusColor(row.status)}40">${row.status}</span></td>
          <td>${row.suggestedText}</td>
          <td style="color:#C9A227">${row.financialRisk}</td>
          <td><span class="ref">${row.legalRef}</span></td>
        </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تقرير الجاهزية القانونية - ميثاق AI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #F5F7FA; color: #1A1A1A; padding: 40px 32px; direction: rtl; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #006C35; padding-bottom: 20px; margin-bottom: 28px; }
    .brand { font-size: 26px; font-weight: 900; color: #006C35; }
    .brand span { color: #1A1A1A; }
    .date { font-size: 13px; color: #6B7280; }
    .subtitle { font-size: 12px; color: #9CA3AF; margin-top: 3px; }
    .scores { display: flex; gap: 16px; margin-bottom: 28px; }
    .score-card { flex: 1; background: #ffffff; border: 1px solid #E5E9EF; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .score-value { font-size: 40px; font-weight: 900; color: #006C35; }
    .score-value-gold { font-size: 28px; font-weight: 900; color: #C9A227; }
    .score-label { font-size: 12px; color: #6B7280; margin-top: 6px; }
    .section-title { font-size: 13px; font-weight: 700; color: #006C35; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E5E9EF; }
    thead tr { background: #F5F7FA; }
    th { text-align: right; padding: 14px 18px; font-size: 11px; color: #6B7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E5E9EF; }
    td { padding: 14px 18px; font-size: 13.5px; color: #1A1A1A; border-bottom: 1px solid #F5F7FA; vertical-align: top; line-height: 1.6; }
    tr:last-child td { border-bottom: none; }
    tr:nth-child(even) { background: #FAFBFC; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; }
    .ref { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; background: #DDF7EA; color: #006C35; border: 1px solid rgba(0,108,53,0.20); }
    .footer { margin-top: 36px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E5E9EF; padding-top: 18px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand"><span>ميثاق </span>AI</div>
      <div class="subtitle">Saudi Legal Engineering Platform — هندسة قانونية للعقود السعودية</div>
    </div>
    <div style="text-align:left">
      <div class="date">تاريخ التحليل: ${date}</div>
      <div class="date" style="margin-top:4px;color:#006C35;font-weight:700">الحالة: ${report.statusLabel}</div>
    </div>
  </div>
  <div class="scores">
    <div class="score-card"><div class="score-value">${report.investmentReadiness}٪</div><div class="score-label">Investment Readiness</div></div>
    <div class="score-card"><div class="score-value">${report.riskMeter}٪</div><div class="score-label">Risk Meter</div></div>
    <div class="score-card"><div class="score-value">${report.saudiCompliance}٪</div><div class="score-label">Saudi Compliance</div></div>
    <div class="score-card"><div class="score-value-gold">${report.financialRiskEstimate.toLocaleString("ar-SA")} ر.س</div><div class="score-label">Financial Risk Estimate</div></div>
  </div>
  <div class="section-title">تفاصيل البنود</div>
  <table>
    <thead><tr><th>البند</th><th>المشكلة</th><th>الصياغة السعودية المقترحة</th><th>المخاطر المالية</th><th>السند النظامي</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <div class="footer">تقرير صادر عن ميثاق AI • Saudi Legal Engineering Platform — Hackathon Demo v1.0</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mithaq-legal-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadRevised = () => {
    const date = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });

    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>عقد عمل - النسخة المُهندَسة</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #fff; color: #111; direction: rtl; line-height: 1.85; }
    .page { max-width: 820px; margin: 0 auto; padding: 40px 56px 60px; }
    .doc-header { text-align: center; border-bottom: 2px solid #006C35; padding-bottom: 20px; margin-bottom: 24px; }
    .doc-header .title-ar { font-size: 28px; font-weight: 900; color: #006C35; margin-bottom: 6px; }
    .doc-header .title-en { font-size: 15px; color: #4A5568; }
    .party-label { font-size: 14px; font-weight: 700; color: #006C35; margin: 14px 0 4px; }
    .emp-table { width: 100%; border-collapse: collapse; font-size: 13.5px; margin-bottom: 8px; }
    .emp-table tr:nth-child(odd) { background: #F5F7FA; }
    .emp-table td { padding: 8px 14px; }
    .emp-table td:first-child { font-weight: 700; width: 30%; }
    .section-hr { border: none; border-top: 1.5px solid #E5E9EF; margin: 20px 0; }
    .article { margin-bottom: 16px; }
    .article-title { font-size: 14px; font-weight: 700; color: #006C35; margin-bottom: 4px; }
    .article-body { font-size: 13.5px; color: #1A1A1A; }
    .sig-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
    .sig-table .sig-header td { background: #DDF7EA; font-weight: 700; color: #006C35; padding: 10px 20px; text-align: center; border: 1px solid rgba(0,108,53,0.20); }
    .sig-table .sig-line td { border-bottom: 1px solid #E5E9EF; padding: 28px 20px 4px; text-align: center; font-size: 13px; color: #4A5568; }
    .sig-table .sig-date td { padding: 8px 20px 20px; text-align: center; font-size: 13px; color: #4A5568; }
    .stamp { display: inline-block; font-size: 13px; font-weight: 700; color: #006C35; border: 2px solid #006C35; border-radius: 8px; padding: 10px 24px; margin-top: 28px; }
    .footer { margin-top: 32px; text-align: center; font-size: 11px; color: #9CA3AF; border-top: 1px solid #E5E9EF; padding-top: 12px; }
    .print-bar { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); }
    .print-btn { background: #006C35; color: #fff; border: none; border-radius: 10px; padding: 12px 32px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Segoe UI',Tahoma,Arial,sans-serif; box-shadow: 0 4px 16px rgba(0,108,53,0.25); }
    @media print { .print-bar { display: none !important; } }
  </style>
</head>
<body>
<div class="page">
  <div class="doc-header"><div class="title-ar">عقد عمل</div><div class="title-en">Employment Contract — Mithaq AI Saudi Legal Engineering</div></div>
  <p style="font-size:14px;color:#1A1A1A;margin-bottom:14px">تم إبرام هذا العقد بتاريخ ${date}م بين الطرفين الآتيين:</p>
  <div class="party-label">الطرف الأول صاحب العمل:</div>
  <p style="font-size:13.5px;margin-bottom:12px">شركة النخبة للتقنية والمعلومات — سجل تجاري رقم 1010123456</p>
  <div class="party-label">الطرف الثاني الموظف:</div>
  <table class="emp-table">
    <tr><td>الاسم:</td><td>________________________</td></tr>
    <tr><td>رقم الهوية:</td><td>________________________</td></tr>
    <tr><td>المسمى الوظيفي:</td><td>________________________</td></tr>
    <tr><td>القسم:</td><td>________________________</td></tr>
  </table>
  <hr class="section-hr" />
  <div class="article"><div class="article-title">المادة الأولى: فترة التجربة</div><div class="article-body">لا تتجاوز فترة التجربة 180 يوماً من تاريخ المباشرة بالعمل وفق المادة 53 من نظام العمل.</div></div>
  <div class="article"><div class="article-title">المادة الثانية: ساعات العمل</div><div class="article-body">لا تزيد ساعات العمل الفعلية عن ثماني (8) ساعات يومياً وثمانٍ وأربعين (48) ساعة أسبوعياً.</div></div>
  <div class="article"><div class="article-title">المادة الثالثة: الراتب والمكافآت</div><div class="article-body">يتقاضى الموظف راتباً شهرياً إجمالياً قدره (12,000) اثنا عشر ألف ريال سعودي.</div></div>
  <div class="article"><div class="article-title">المادة الرابعة: الإجازة السنوية</div><div class="article-body">يستحق الموظف إجازة سنوية مدتها واحد وعشرون (21) يوماً بأجر كامل.</div></div>
  <div class="article"><div class="article-title">المادة الخامسة: إجازة الوضع</div><div class="article-body">تستحق العاملة إجازة وضع مدتها اثنا عشر (12) أسبوعاً عند الوضع وفق المادة 151 من نظام العمل.</div></div>
  <div class="article"><div class="article-title">المادة السادسة: مكافأة نهاية الخدمة</div><div class="article-body">يستحق الموظف مكافأة نهاية خدمة بواقع أجر شهر عن كل سنة من سنوات الخدمة.</div></div>
  <div class="article"><div class="article-title">المادة السابعة: السرية</div><div class="article-body">يلتزم الموظف بالحفاظ على سرية المعلومات لمدة سنتين بعد انتهاء العقد مع تحديد نطاق المعلومات.</div></div>
  <div class="article"><div class="article-title">المادة الثامنة: إنهاء العقد</div><div class="article-body">يلتزم الطرف الراغب في الإنهاء بتقديم إشعار مسبق لا يقل عن ثلاثين (30) يوماً وفق المادة 75.</div></div>
  <hr class="section-hr" />
  <table class="sig-table">
    <tr class="sig-header"><td>توقيع صاحب العمل</td><td>توقيع الموظف</td></tr>
    <tr class="sig-line"><td>المدير العام</td><td>________________________</td></tr>
    <tr class="sig-date"><td>التاريخ: ${date}</td><td>التاريخ: ${date}</td></tr>
  </table>
  <div style="text-align:center"><span class="stamp">✅ معتمد من ميثاق AI | Saudi Legal Engineering Platform</span></div>
  <div class="footer">عقد مُهندَس بواسطة ميثاق AI • Saudi Legal Engineering Platform — Hackathon Demo v1.0</div>
</div>
<div class="print-bar"><button class="print-btn" onclick="window.print()">🖨️ طباعة / حفظ PDF</button></div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mithaq-revised-contract-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      id="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ border: "1px solid rgba(0,108,53,0.18)", background: "#DDF7EA", color: "#006C35" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#006C35" }} />
            تقرير الجاهزية القانونية
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#1A1A1A" }}>
            نتائج الهندسة القانونية
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            تم اكتشاف المخالفات وإعادة هندسة العقد وفق معايير السعودة والجاهزية الاستثمارية
          </p>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-10 md:gap-16 mb-10"
        >
          {[
            { value: "٤", label: "وكلاء ذكيين" },
            { value: `${report.saudiCompliance}٪`, label: "امتثال سعودي" },
            { value: `${analysisTime}ث`, label: "وقت التحليل" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "#9CA3AF" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Metric cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-8 mb-8"
          style={{ border: "1px solid #E5E9EF", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
        >
          <h3
            className="text-center text-xs font-bold uppercase tracking-widest mb-8"
            style={{ color: "#9CA3AF" }}
          >
            مؤشرات الجاهزية
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <ScoreCircle
              score={report.investmentReadiness}
              label="Investment Readiness"
              delay={0}
              gradientId="readinessGrad"
              colorStart="#006C35"
              colorEnd="#00A86B"
            />
            <ScoreCircle
              score={report.riskMeter}
              label="Risk Meter"
              delay={0.15}
              gradientId="riskGrad"
              colorStart="#DC2626"
              colorEnd="#D97706"
            />
            <ScoreCircle
              score={report.saudiCompliance}
              label="Saudi Compliance"
              delay={0.3}
              gradientId="complianceGrad"
              colorStart="#006C35"
              colorEnd="#00A86B"
            />
            {/* Financial risk */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center"
                style={{ border: "6px solid #FDE68A", background: "#FFFBEB" }}
              >
                <span className="text-xs font-bold" style={{ color: "#D97706" }}>ر.س</span>
                <span className="text-lg font-black" style={{ color: "#C9A227" }}>
                  {(report.financialRiskEstimate / 1000).toFixed(0)}K
                </span>
              </div>
              <span className="text-xs font-semibold text-center max-w-[110px] leading-snug" style={{ color: "#4A5568" }}>
                Financial Risk Estimate
              </span>
            </motion.div>
          </div>

          {/* Status badge */}
          <div className="mt-6 text-center">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm"
              style={{ background: "#DDF7EA", color: "#006C35", border: "1px solid rgba(0,108,53,0.22)" }}
            >
              <span>✓</span>
              الحالة: {report.statusLabel}
            </span>
          </div>
        </motion.div>

        {/* Compliance table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-white overflow-hidden mb-8"
          style={{ border: "1px solid #E5E9EF", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{ borderBottom: "1px solid #F3F4F6", background: "#FAFBFC" }}
          >
            <h3 className="font-bold" style={{ color: "#1A1A1A" }}>
              تفاصيل البنود المُهندَسة
            </h3>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "#DDF7EA", color: "#006C35", border: "1px solid rgba(0,108,53,0.18)" }}
            >
              {report.rows.length} بنود مراجعة
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
                  {["البند", "المشكلة", "الصياغة السعودية المقترحة", "المخاطر المالية", "السند النظامي"].map((h) => (
                    <th
                      key={h}
                      className="text-right px-5 py-4 text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#6B7280" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row, index) => {
                  const cfg = STATUS_CONFIG[row.status] ?? STATUS_CONFIG["متوافق"];
                  return (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      style={{
                        borderBottom: "1px solid #F3F4F6",
                        background: index % 2 === 1 ? "#FAFBFC" : "#FFFFFF",
                      }}
                    >
                      <td className="px-5 py-4 font-medium" style={{ color: "#1A1A1A" }}>
                        {row.originalClause}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                        >
                          {cfg.icon} {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "#374151" }}>
                        {row.suggestedText}
                      </td>
                      <td className="px-5 py-4 text-xs leading-relaxed" style={{ color: "#D97706" }}>
                        {row.financialRisk}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                          style={{ background: "#DDF7EA", color: "#006C35", border: "1px solid rgba(0,108,53,0.18)" }}
                        >
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
          <div className="md:hidden space-y-3 p-4">
            {report.rows.map((row, index) => {
              const cfg = STATUS_CONFIG[row.status] ?? STATUS_CONFIG["متوافق"];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="rounded-xl p-4 space-y-2.5"
                  style={{ border: "1px solid #E5E9EF", background: "#FAFBFC" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{row.originalClause}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap"
                      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                    >
                      {row.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>{row.suggestedText}</p>
                  <p className="text-xs" style={{ color: "#D97706" }}>{row.financialRisk}</p>
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-lg"
                    style={{ background: "#DDF7EA", color: "#006C35", border: "1px solid rgba(0,108,53,0.18)" }}
                  >
                    {row.legalRef}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Agent summary collapsible — only shown when source is langflow */}
        {report.source === "langflow" && report.agentSummary && (
          <AgentSummaryPanel summary={report.agentSummary} />
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 text-white"
            style={{
              background: "#006C35",
              boxShadow: "0 8px 24px rgba(0,108,53,0.22)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#005028"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#006C35"; }}
          >
            <span>📥</span>
            تحميل تقرير الجاهزية
          </button>

          <button
            onClick={handleDownloadRevised}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              border: "1.5px solid #006C35",
              color: "#006C35",
              background: "#FFFFFF",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#DDF7EA";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
            }}
          >
            <span>📄</span>
            تحميل العقد المُهندَس
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
