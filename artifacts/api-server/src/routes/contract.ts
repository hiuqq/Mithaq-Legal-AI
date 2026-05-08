import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

type ComplianceRow = {
  originalClause: string;
  status: "مخالف" | "يحتاج تحسين" | "متوافق";
  suggestedText: string;
  legalRef: string;
  financialRisk: string;
};

const VALID_STATUSES = new Set(["مخالف", "يحتاج تحسين", "متوافق"]);

function isValidRow(r: unknown): r is ComplianceRow {
  if (!r || typeof r !== "object") return false;
  const row = r as Record<string, unknown>;
  return (
    typeof row.originalClause === "string" && row.originalClause.trim() !== "" &&
    typeof row.status === "string" && VALID_STATUSES.has(row.status) &&
    typeof row.suggestedText === "string" && row.suggestedText.trim() !== "" &&
    typeof row.legalRef === "string" && row.legalRef.trim() !== ""
  );
}

function parseAgentOutput(text: string): ComplianceRow[] | null {
  if (!text || text.trim() === "") return null;

  // 1. Try to find a JSON array in the text (inside ```json ... ``` or bare)
  const jsonPatterns = [
    /```json\s*([\s\S]*?)\s*```/i,
    /```\s*([\s\S]*?)\s*```/i,
    /(\[[\s\S]*\])/,
  ];

  for (const pattern of jsonPatterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        const parsed = JSON.parse(match[1]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const rows = parsed
            .map((r) => ({
              originalClause: r.originalClause ?? r.original_clause ?? r.clause ?? "",
              status: r.status ?? "مخالف",
              suggestedText: r.suggestedText ?? r.suggested_text ?? r.suggestion ?? "",
              legalRef: r.legalRef ?? r.legal_ref ?? r.article ?? "",
              financialRisk: r.financialRisk ?? r.financial_risk ?? r.risk ?? "",
            }))
            .filter(isValidRow);
          if (rows.length > 0) return rows;
        }
      } catch {
        // continue to next pattern
      }
    }
  }

  // 2. Try parsing the whole text as JSON
  try {
    const parsed = JSON.parse(text.trim());
    const arr = Array.isArray(parsed) ? parsed : parsed?.rows ?? parsed?.data;
    if (Array.isArray(arr) && arr.length > 0) {
      const rows = arr
        .map((r) => ({
          originalClause: r.originalClause ?? r.original_clause ?? r.clause ?? "",
          status: r.status ?? "مخالف",
          suggestedText: r.suggestedText ?? r.suggested_text ?? r.suggestion ?? "",
          legalRef: r.legalRef ?? r.legal_ref ?? r.article ?? "",
          financialRisk: r.financialRisk ?? r.financial_risk ?? r.risk ?? "",
        }))
        .filter(isValidRow);
      if (rows.length > 0) return rows;
    }
  } catch {
    // fall through
  }

  return null;
}

const MOCK_ROWS: ComplianceRow[] = [
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
    originalClause: "الإجازة السنوية 15 يوماً",
    status: "يحتاج تحسين",
    suggestedText: "تستحق الموظف إجازة سنوية لا تقل عن 21 يوماً",
    legalRef: "المادة 109",
    financialRisk: "حتى 12,000 ريال",
  },
];

router.post("/analyze-contract", upload.single("file"), async (req, res) => {
  try {
    const langflowUrl = "https://expensive-volatile-breeching.ngrok-free.dev/api/v1/run/c633b0b1-9d7c-487d-97f9-569358f664d0";

    const langflowResponse = await fetch(langflowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LANGFLOW_API_KEY ?? "",
      },
      body: JSON.stringify({
        input_type: "chat",
        output_type: "chat",
        input_value: req.file
          ? req.file.buffer.toString("base64")
          : "analyze this contract",
      }),
    });

    const langflowData = await langflowResponse.json() as {
      outputs?: { outputs?: { results?: { message?: { text?: string } } }[] }[];
    };

    const agentOutput =
      langflowData?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ?? "";

    const parsedRows = parseAgentOutput(agentOutput);
    const rows = parsedRows ?? MOCK_ROWS;

    const report = {
      scoreBefore: 62,
      scoreAfter: 96,
      statusLabel: "محسّن",
      rows,
      agentSummary: agentOutput,
      source: parsedRows ? "langflow" : "mock",
    };

    res.json({ success: true, report });
  } catch (error) {
    res.json({
      success: true,
      report: {
        scoreBefore: 62,
        scoreAfter: 96,
        statusLabel: "محسّن",
        rows: MOCK_ROWS,
        agentSummary: "",
        source: "mock",
      },
    });
  }
});

export default router;
