import axios, { AxiosError } from "axios";

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  const url = `${process.env.LANGFLOW_API_URL}/api/v1/run/${process.env.FLOW_ID}?fallback=true`;

  const body = {
    input_value: `Please analyze the attached contract: ${fileName}`,
    input_type: "chat",
    output_type: "chat",
    tweaks: {},
  };

  console.log("[LangFlow] Calling:", url);
  console.log("[LangFlow] Request body:", JSON.stringify(body, null, 2));

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      timeout: 90_000,
    });

    console.log("[LangFlow] Response status:", response.status);
    console.log("[LangFlow] Response body:", JSON.stringify(response.data, null, 2));

    return response.data.outputs[0].outputs[0].results.message.text as string;
  } catch (err) {
    const axiosErr = err as AxiosError;

    console.error("[LangFlow] Request failed");
    console.error("[LangFlow] Status:", axiosErr.response?.status);
    console.error("[LangFlow] Response body:", JSON.stringify(axiosErr.response?.data, null, 2));
    console.error("[LangFlow] Message:", axiosErr.message);

    throw err;
  }
};
