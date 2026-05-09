import axios from "axios";
import FormData from "form-data";

const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
};

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  const baseUrl = process.env.LANGFLOW_API_URL;
  const flowId = process.env.FLOW_ID;

  // ── Step 1: Upload the PDF file ──────────────────────────────────────────
  const formData = new FormData();
  formData.append("file", fileBuffer, {
    filename: fileName,
    contentType: "application/pdf",
  });

  const uploadResponse = await axios.post(
    `${baseUrl}/api/v1/files/upload/${flowId}`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        ...NGROK_HEADERS,
      },
      timeout: 30_000,
    }
  );

  const filePath: string = uploadResponse.data.file_path;

  // ── Step 2: Run the flow with the uploaded file in tweaks ─────────────────
  const runResponse = await axios.post(
    `${baseUrl}/api/v1/run/${flowId}?stream=false`,
    {
      input_value: "Please analyze the attached contract.",
      input_type: "chat",
      output_type: "chat",
      tweaks: {
        "ChatInput-ccXwZ": {
          files: [filePath],
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        ...NGROK_HEADERS,
      },
      timeout: 90_000,
    }
  );

  return runResponse.data.outputs[0].outputs[0].results.message.text as string;
};
