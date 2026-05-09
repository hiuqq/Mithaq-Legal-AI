import axios from "axios";

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  const response = await axios.post(
    `${process.env.LANGFLOW_API_URL}/api/v1/run/${process.env.FLOW_ID}?fallback=true`,
    {
      input_value: `Please analyze the attached contract: ${fileName}`,
      input_type: "chat",
      output_type: "chat",
      tweaks: {},
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      timeout: 90_000,
    }
  );

  return response.data.outputs[0].outputs[0].results.message.text as string;
};
