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

    const mockReport = {
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
          originalClause: "الإجازة السنوية 15 يوماً",
          status: "يحتاج تحسين",
          suggestedText: "تستحق الموظف إجازة سنوية لا تقل عن 21 يوماً",
          legalRef: "المادة 109",
          financialRisk: "حتى 12,000 ريال",
        },
      ],
      // TODO: Parse agentOutput into ComplianceReport format
      agentSummary: agentOutput,
    };

    res.json({ success: true, report: mockReport });
  } catch (error) {
    res.status(500).json({ success: false, error: "Analysis failed" });
  }
});

export default router;
