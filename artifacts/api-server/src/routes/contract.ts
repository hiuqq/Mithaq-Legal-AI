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
    // req.file is the uploaded PDF (buffer + metadata)
    // TODO: Pass req.file.buffer to LangFlow agents when ready
    // const pdfBuffer = req.file?.buffer;

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
        {
          originalClause: "الإجازة السنوية 15 يوماً",
          status: "مخالف",
          suggestedText: "تستحق الموظف إجازة سنوية لا تقل عن 21 يوماً",
          legalRef: "المادة 109",
        },
      ],
    };

    res.json({ success: true, report: mockReport });
  } catch (error) {
    res.status(500).json({ success: false, error: "Analysis failed" });
  }
});

export default router;
