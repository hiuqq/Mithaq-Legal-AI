import { ComplianceReport } from "@/data/mockData";

export async function analyzeContract(file: File): Promise<ComplianceReport> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/analyze-contract", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }

  const data = await response.json();
  const raw = data.report;

  // Normalize API response to current ComplianceReport shape,
  // providing safe defaults for fields added in the Legal Engineering rebrand
  // so the frontend renders correctly even if the API predates this update.
  return {
    scoreBefore: raw.scoreBefore ?? 0,
    scoreAfter: raw.scoreAfter ?? 0,
    statusLabel: raw.statusLabel ?? "—",
    rows: (raw.rows ?? []).map((r: Record<string, unknown>) => ({
      ...r,
      financialRisk: (r.financialRisk as string) ?? "—",
    })),
    investmentReadiness: raw.investmentReadiness ?? raw.scoreAfter ?? 0,
    riskMeter: raw.riskMeter ?? 0,
    saudiCompliance: raw.saudiCompliance ?? raw.scoreAfter ?? 0,
    financialRiskEstimate: raw.financialRiskEstimate ?? 0,
  } as ComplianceReport;
}
