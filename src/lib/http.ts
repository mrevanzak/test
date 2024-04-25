import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://beecrm.online",
  headers: {
    "Content-Type": "application/json",
  },
});
