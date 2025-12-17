import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://alokrj-plant-disease-backend.hf.space";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
