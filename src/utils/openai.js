import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-TeTtjbdFQ8weRo1PYqpqlbv4",
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);
