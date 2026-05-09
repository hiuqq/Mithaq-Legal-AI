import axios, { AxiosError, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { logger } from "./logger.js";

const DEBUG = process.env.LANGFLOW_DEBUG === "true";
const MAX_RETRIES = 3;
const RUN_TIMEOUT = 300_000;   // 5 minutes — multi-agent pipeline
const UPLOAD_TIMEOUT = 30_000; // 30 seconds — file upload only

const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
};

function dbg(label: string, data: unknown) {
  if (DEBUG) {
    logger.info({ langflow: label, data }, `[LangFlow Debug] ${label}`);
  }
}

async function axiosWithRetry<T>(
  config: AxiosRequestConfig,
  label: string
): Promise<import("axios").AxiosResponse<T>> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 1) {
        dbg(`${label}:retry`, { attempt });
        logger.info({ label, attempt }, `[LangFlow] Retrying (attempt ${attempt}/${MAX_RETRIES})`);
      }
      return await axios.request<T>(config);
    } catch (err) {
      lastErr = err;
      const axiosErr = err as AxiosError;
      const status = axiosErr.response?.status;
      // Don't retry on 4xx client errors — only on network/5xx issues
      if (status && status >= 400 && status < 500) {
        dbg(`${label}:no-retry`, { status, reason: "4xx client error" });
        throw err;
      }
      if (attempt < MAX_RETRIES) {
        const delay = attempt * 2000;
        dbg(`${label}:will-retry`, { attempt, delay, error: axiosErr.message });
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  // Always use 127.0.0.1 (not localhost) to avoid IPv6 resolution issues
  const baseUrl = (process.env.LANGFLOW_API_URL ?? "http://127.0.0.1:7860")
    .replace("localhost", "127.0.0.1");
  const flowId = process.env.FLOW_ID;

  dbg("config", { baseUrl, flowId, fileName, fileSizeBytes: fileBuffer.length });

  // ── Step 1: Upload the PDF file ──────────────────────────────────────────
  const formData = new FormData();
  formData.append("file", fileBuffer, {
    filename: fileName,
    contentType: "application/pdf",
  });

  const uploadUrl = `${baseUrl}/api/v1/files/upload/${flowId}`;
  dbg("step1:upload:request", { url: uploadUrl });

  const uploadResponse = await axiosWithRetry<{ file_path: string }>(
    {
      method: "POST",
      url: uploadUrl,
      data: formData,
      headers: { ...formData.getHeaders(), ...NGROK_HEADERS },
      timeout: UPLOAD_TIMEOUT,
    },
    "step1:upload"
  );

  const filePath: string = uploadResponse.data.file_path;
  dbg("step1:upload:response", { status: uploadResponse.status, filePath });

  // ── Step 2: Run the flow with the uploaded file in tweaks ─────────────────
  const triggerMessage = "قم بتحليل هذا العقد وتوضيح مدى توافقه مع نظام العمل السعودي 2025";
  const runUrl = `${baseUrl}/api/v1/run/${flowId}?stream=false`;
  const runPayload = {
    input_value: triggerMessage,
    input_type: "chat",
    output_type: "chat",
    tweaks: {
      "ChatInput-ccXwZ": {
        input_value: triggerMessage,
        files: [filePath],
      },
    },
  };

  dbg("step2:run:request", { url: runUrl, payload: runPayload });

  const runResponse = await axiosWithRetry<{
    outputs: { outputs: { results: { message: { text: string } } }[] }[];
  }>(
    {
      method: "POST",
      url: runUrl,
      data: runPayload,
      headers: { "Content-Type": "application/json", ...NGROK_HEADERS },
      timeout: RUN_TIMEOUT,
    },
    "step2:run"
  );

  const outputText =
    runResponse.data.outputs[0].outputs[0].results.message.text;

  dbg("step2:run:response", {
    status: runResponse.status,
    outputLength: outputText.length,
    outputPreview: outputText.slice(0, 300),
  });

  return outputText;
};
