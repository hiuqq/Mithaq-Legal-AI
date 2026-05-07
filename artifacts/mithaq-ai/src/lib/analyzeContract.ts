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
  return data.report as ComplianceReport;
}
