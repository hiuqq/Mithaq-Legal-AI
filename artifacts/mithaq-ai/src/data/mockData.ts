// ============================================================
// MOCK DATA — Replace with real API responses in production
// ============================================================

export interface ComplianceRow {
  originalClause: string;
  status: "مخالف" | "يحتاج تحسين" | "متوافق";
  suggestedText: string;
  legalRef: string;
  financialRisk: string;
}

export interface ComplianceReport {
  scoreBefore: number;
  scoreAfter: number;
  statusLabel: string;
  rows: ComplianceRow[];
  source?: "langflow" | "mock";
  agentSummary?: string;
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
      financialRisk: "حتى 10,000 ريال",
    },
    {
      originalClause: "إجازة الوضع 10 أسابيع",
      status: "مخالف",
      suggestedText: "تستحق العاملة إجازة وضع مدتها 12 أسبوعًا",
      legalRef: "المادة 151",
      financialRisk: "حتى 15,000 ريال",
    },
    {
      originalClause: "ساعات العمل 10 ساعات",
      status: "يحتاج تحسين",
      suggestedText: "لا تزيد ساعات العمل عن 8 ساعات يوميًا",
      legalRef: "المادة 98",
      financialRisk: "حتى 8,000 ريال",
    },
    {
      originalClause: "الإجازة السنوية 15 يومًا",
      status: "يحتاج تحسين",
      suggestedText: "تستحق الإجازة السنوية 21 يومًا بعد سنة خدمة",
      legalRef: "المادة 109",
      financialRisk: "حتى 12,000 ريال",
    },
  ],
};

export const ANALYSIS_STEPS = [
  { id: 1, label: "المشرف يستلم العقد", icon: "📋" },
  { id: 2, label: "المحلل القانوني يفحص البنود", icon: "🔍" },
  { id: 3, label: "مهندس الصياغة يعيد الهندسة", icon: "✍️" },
  { id: 4, label: "الدرع القضائي يصدر تقرير الجاهزية", icon: "🛡️" },
];

export const AGENTS = [
  {
    id: "analyst",
    name: "المحلل القانوني",
    nameEn: "LEGAL ANALYST AGENT",
    description: "يحلل بنود العقد ويكتشف المخالفات النظامية ويقيّم مدى توافقها مع الأنظمة واللوائح السعودية المعتمدة.",
    icon: "🔍",
    color: "from-emerald-500/20 to-blue-600/10",
    borderColor: "border-emerald-500/30",
    glowColor: "rgba(0, 200, 83, 0.15)",
  },
  {
    id: "drafter",
    name: "مهندس الصياغة السعودية",
    nameEn: "SAUDI DRAFTING ENGINEER",
    description: "يعيد هندسة العقد بصياغات قانونية سعودية محلية تحمي حقوق الطرفين وتتوافق مع بيئة الأعمال المحلية.",
    icon: "✍️",
    color: "from-blue-500/20 to-emerald-600/10",
    borderColor: "border-blue-400/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "financial",
    name: "محلل المخاطر المالية",
    nameEn: "FINANCIAL RISK ANALYST",
    description: "يقدّر الغرامات والتعويضات والتبعات المالية المحتملة لكل بند مخالف ويحدد مخاطر الاستثمار.",
    icon: "📊",
    color: "from-teal-500/20 to-emerald-600/10",
    borderColor: "border-teal-400/30",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    id: "shield",
    name: "الدرع القضائي",
    nameEn: "JUDICIAL SHIELD AGENT",
    description: "يراجع جاهزية العقد للتقاضي ويصدر تقرير الجاهزية الاستثمارية الشامل مع السند النظامي لكل توصية.",
    icon: "🛡️",
    color: "from-emerald-500/20 to-green-600/10",
    borderColor: "border-emerald-400/30",
    glowColor: "rgba(0, 200, 83, 0.2)",
  },
];

export const ARCHITECTURE_NODES = [
  { label: "رفع العقد", icon: "📄" },
  { label: "المشرف", icon: "🤖" },
  { label: "وكيل التدقيق", icon: "🔍" },
  { label: "وكيل الصياغة", icon: "✍️" },
  { label: "وكيل الإشراف", icon: "📊" },
  { label: "تقرير الامتثال", icon: "✅" },
];
