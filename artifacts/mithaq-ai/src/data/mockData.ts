// ============================================================
// MOCK DATA — Replace with real API responses in production
// ============================================================

export interface ComplianceRow {
  originalClause: string;
  status: "مخالف" | "يحتاج تحسين" | "متوافق";
  suggestedText: string;
  financialRisk: string;
  legalRef: string;
}

export interface ComplianceReport {
  scoreBefore: number;
  scoreAfter: number;
  statusLabel: string;
  rows: ComplianceRow[];
  // Optional fields for live API integration (langflow backend)
  source?: "langflow" | "mock";
  agentSummary?: string;
  // New metrics added in Legal Engineering rebrand
  investmentReadiness: number;
  riskMeter: number;
  saudiCompliance: number;
  financialRiskEstimate: number;
}

export const MOCK_COMPLIANCE_REPORT: ComplianceReport = {
  scoreBefore: 62,
  scoreAfter: 96,
  statusLabel: "جاهز للاستثمار",
  investmentReadiness: 87,
  riskMeter: 18,
  saudiCompliance: 96,
  financialRiskEstimate: 340000,
  rows: [
    {
      originalClause: "فترة التجربة 9 أشهر",
      status: "مخالف",
      suggestedText: "لا تتجاوز فترة التجربة 180 يومًا من تاريخ المباشرة بالعمل",
      financialRisk: "مطالبات تعويض محتملة تصل إلى 3 رواتب",
      legalRef: "المادة 53 نظام العمل",
    },
    {
      originalClause: "إجازة الوضع 10 أسابيع",
      status: "مخالف",
      suggestedText: "تستحق العاملة إجازة وضع مدتها 12 أسبوعًا بأجر كامل",
      financialRisk: "غرامات نظامية + مطالبات قضائية",
      legalRef: "المادة 151 نظام العمل",
    },
    {
      originalClause: "ساعات العمل 10 ساعات يومياً",
      status: "يحتاج تحسين",
      suggestedText: "لا تزيد ساعات العمل الفعلية عن 8 ساعات يومياً و48 أسبوعياً",
      financialRisk: "تعويض ساعات إضافية غير محسوبة",
      legalRef: "المادة 98 نظام العمل",
    },
    {
      originalClause: "بند السرية مطلق بلا سقف زمني",
      status: "يحتاج تحسين",
      suggestedText: "يلتزم الموظف بالسرية لمدة سنتين بعد انتهاء العقد مع تحديد نطاق المعلومات",
      financialRisk: "بطلان البند وعدم إمكانية التنفيذ",
      legalRef: "المادة 83 نظام العمل",
    },
    {
      originalClause: "إنهاء العقد فوري دون إشعار",
      status: "مخالف",
      suggestedText: "يلتزم الطرف المنهي للعقد بإشعار مسبق لا يقل عن 30 يوماً",
      financialRisk: "تعويض يعادل راتب شهرين كحد أدنى",
      legalRef: "المادة 75 نظام العمل",
    },
  ],
};

export const ANALYSIS_STEPS = [
  { id: 1, label: "المحلل القانوني يستلم العقد ويفحص البنود", icon: "🔍" },
  { id: 2, label: "مهندس الصياغة السعودية يصوغ البنود المحلية", icon: "✍️" },
  { id: 3, label: "محلل المخاطر المالية يقيّم التبعات المالية", icon: "💰" },
  { id: 4, label: "الدرع القضائي يصدر تقرير الجاهزية الاستثمارية", icon: "🛡️" },
];

export const AGENTS = [
  {
    id: "legal-analyst",
    name: "المحلل القانوني",
    nameEn: "Legal Analyst Agent",
    description: "يحلل بنود العقد ويكتشف المخالفات النظامية ويقيّم مدى توافقها مع الأنظمة واللوائح السعودية المعتمدة.",
    icon: "🔍",
    color: "from-saudi/20 to-saudi/10",
    borderColor: "border-glow/20",
    glowColor: "rgba(0, 168, 107, 0.10)",
  },
  {
    id: "drafting-engineer",
    name: "مهندس الصياغة السعودية",
    nameEn: "Saudi Drafting Engineer",
    description: "يعيد هندسة العقد بصياغات قانونية سعودية محلية تحمي حقوق الطرفين وتتوافق مع بيئة الأعمال المحلية.",
    icon: "✍️",
    color: "from-gold/15 to-saudi/10",
    borderColor: "border-gold/20",
    glowColor: "rgba(201, 162, 39, 0.10)",
  },
  {
    id: "financial-risk",
    name: "محلل المخاطر المالية",
    nameEn: "Financial Risk Analyst",
    description: "يقدّر الغرامات والتعويضات والتبعات المالية المحتملة لكل بند مخالف، ويحدد مخاطر الاستثمار.",
    icon: "💰",
    color: "from-gold/15 to-gold/8",
    borderColor: "border-gold/20",
    glowColor: "rgba(201, 162, 39, 0.10)",
  },
  {
    id: "judicial-shield",
    name: "الدرع القضائي",
    nameEn: "Judicial Shield Agent",
    description: "يراجع جاهزية العقد للتقاضي ويصدر تقرير الجاهزية الاستثمارية الشامل مع السند النظامي لكل توصية.",
    icon: "🛡️",
    color: "from-glow/15 to-saudi/10",
    borderColor: "border-glow/20",
    glowColor: "rgba(0, 168, 107, 0.10)",
  },
];

export const ARCHITECTURE_NODES = [
  { label: "رفع العقد", icon: "📄" },
  { label: "طبقة الخصوصية", icon: "🔒" },
  { label: "المحلل القانوني", icon: "🔍" },
  { label: "مهندس الصياغة", icon: "✍️" },
  { label: "محلل المخاطر المالية", icon: "💰" },
  { label: "الدرع القضائي", icon: "🛡️" },
  { label: "تقرير الجاهزية", icon: "✅" },
];
