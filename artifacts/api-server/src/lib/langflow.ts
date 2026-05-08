import axios from "axios";
import FormData from "form-data";

export const analyzeContractWithLangflow = async (
  fileBuffer: Buffer,
  fileName: string
): Promise<string> => {
  const formData = new FormData();

  formData.append("files", fileBuffer, fileName);
  formData.append("input_value", "Please analyze the attached contract.");
  formData.append("input_type", "chat");
  formData.append("output_type", "chat");

  const response = await axios.post(
    `${process.env.LANGFLOW_API_URL}/api/v1/run/${process.env.FLOW_ID}`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.LANGFLOW_TOKEN}`,
      },
      timeout: 90_000,
    }
  );

  return response.data.outputs[0].outputs[0].results.message.text as string;
};
