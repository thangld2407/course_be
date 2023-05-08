import {
  generateRequestUrl,
  normaliseResponse,
} from "google-translate-api-browser";

const translate = async (text) => {
  try {
    const url = generateRequestUrl(text, {
      from: "auto",
      to: "en",
    });

    const response = await fetch(url);
    const data = await response.json();
    return normaliseResponse(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default translate;
