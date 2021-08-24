import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

export const signUp = (name, email, password) =>
  api.post("/api/signup", name, email, password);
