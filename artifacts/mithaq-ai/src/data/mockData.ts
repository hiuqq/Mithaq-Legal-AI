// ============================================================
// MOCK DATA — Replace with real API responses in production
// ============================================================

export interface ComplianceRow {
  originalClause: string;
  status: "مخالف" | "يحتاج تحسين" | "متوافق";
  suggestedText: string;
  legalRef: string;
}

export interface ComplianceReport {
  scoreBefore: number;
  scoreAfter: number;
  statusLabel: string;
  rows: ComplianceRow[];
}

export const MOCK_COMPLIANCE_REPORT: ComplianceReport = {
  scoreBefore: 62,
  scoreAfter: 96,
  statusLabel: "محسّن",
  rows: [
    {
      originalClause: "فترة التجربة 9 أشهر",
      status: "مخالف",
      suggestedText: "لا تتجاوز فترة التجربة 180 يومًا",
      legalRef: "المادة 53",
    },
    {
      originalClause: "إجازة الوضع 10 أسابيع",
      status: "مخالف",
      suggestedText: "تستحق العاملة إجازة وضع مدتها 12 أسبوعًا",
      legalRef: "المادة 151",
    },
    {
      originalClause: "ساعات العمل 10 ساعات",
      status: "يحتاج تحسين",
      suggestedText: "لا تزيد ساعات العمل عن 8 ساعات يوميًا",
      legalRef: "المادة 98",
    },
  ],
};

export const ANALYSIS_STEPS = [
  { id: 1, label: "المشرف يستلم العقد", icon: "📋" },
  { id: 2, label: "وكيل التدقيق يراجع البنود", icon: "🔍" },
  { id: 3, label: "وكيل الصياغة يقترح التعديلات", icon: "✍️" },
  { id: 4, label: "وكيل الإشراف يصدر التقرير النهائي", icon: "📊" },
];

export const AGENTS = [
  {
    id: "audit",
    name: "وكيل التدقيق",
    nameEn: "Audit Agent",
    description: "يحلل بنود العقد ويقارنها بالأنظمة واللوائح المعمول بها في نظام العمل السعودي 2025.",
    icon: "🔍",
    color: "from-cyan-500/20 to-blue-600/10",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(0, 220, 220, 0.15)",
  },
  {
    id: "drafting",
    name: "وكيل الصياغة",
    nameEn: "Drafting Agent",
    description: "يقترح صياغات قانونية بديلة ومحسّنة تتوافق مع متطلبات النظام وتحمي حقوق الطرفين.",
    icon: "✍️",
    color: "from-blue-500/20 to-cyan-600/10",
    borderColor: "border-blue-400/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "supervisor",
    name: "وكيل الإشراف",
    nameEn: "Supervisor Agent",
    description: "يراجع النتائج ويتابع حالة العقد حتى الاعتماد النهائي ويصدر تقرير الامتثال الشامل.",
    icon: "📊",
    color: "from-teal-500/20 to-cyan-600/10",
    borderColor: "border-teal-400/30",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    id: "monitoring",
    name: "وكيل المراقبة المستمرة",
    nameEn: "Continuous Compliance Agent",
    description: "يراقب التحديثات التنظيمية الجديدة ويعيد فتح العقود المتأثرة تلقائيًا لضمان الامتثال المستمر.",
    icon: "👁️",
    color: "from-indigo-500/20 to-purple-600/10",
    borderColor: "border-indigo-400/30",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
];

export const ARCHITECTURE_NODES = [
  { label: "رفع العقد", icon: "📄" },
  { label: "المشرف", icon: "🤖" },
  { label: "وكيل التدقيق", icon: "🔍" },
  { label: "وكيل الصياغة", icon: "✍️" },
  { label: "وكيل الإشراف", icon: "📊" },
  { label: "وكيل المراقبة", icon: "👁️" },
  { label: "تقرير الامتثال", icon: "✅" },
];
