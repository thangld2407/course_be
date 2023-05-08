import axios from "axios";

const service = axios.create({
  baseURL: "https://api.openai.com/v1",
  timeout: 1000000000,
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

export default service;
