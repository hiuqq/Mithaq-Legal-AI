import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { logger } from "./logger.js";

const DEBUG = process.env.LANGFLOW_DEBUG === "true";

const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
};

function dbg(label: string, data: unknown) {
  if (DEBUG) {
    logger.info({ langflow: label, data }, `[LangFlow Debug] ${label}`);
  }
}

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  const baseUrl = process.env.LANGFLOW_API_URL ?? "http://127.0.0.1:7860";
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

  let uploadResponse;
  try {
    uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        ...NGROK_HEADERS,
      },
      timeout: 30_000,
    });
  } catch (err) {
    const axiosErr = err as AxiosError;
    dbg("step1:upload:error", {
      status: axiosErr.response?.status,
      data: axiosErr.response?.data,
      message: axiosErr.message,
    });
    throw err;
  }

  const filePath: string = uploadResponse.data.file_path;
  dbg("step1:upload:response", { status: uploadResponse.status, filePath });

  // ── Step 2: Run the flow with the uploaded file in tweaks ─────────────────
  const runUrl = `${baseUrl}/api/v1/run/${flowId}?stream=false`;
  const runPayload = {
    input_value: "Please analyze the attached contract.",
    input_type: "chat",
    output_type: "chat",
    tweaks: {
      "ChatInput-ccXwZ": {
        input_value: "Please analyze this contract",
        files: [filePath],
      },
    },
  };

  dbg("step2:run:request", { url: runUrl, payload: runPayload });

  let runResponse;
  try {
    runResponse = await axios.post(runUrl, runPayload, {
      headers: {
        "Content-Type": "application/json",
        ...NGROK_HEADERS,
      },
      timeout: 120_000,
    });
  } catch (err) {
    const axiosErr = err as AxiosError;
    dbg("step2:run:error", {
      status: axiosErr.response?.status,
      data: axiosErr.response?.data,
      message: axiosErr.message,
    });
    throw err;
  }

  const outputText =
    runResponse.data.outputs[0].outputs[0].results.message.text as string;

  dbg("step2:run:response", {
    status: runResponse.status,
    outputLength: outputText.length,
    outputPreview: outputText.slice(0, 300),
  });

  return outputText;
};
