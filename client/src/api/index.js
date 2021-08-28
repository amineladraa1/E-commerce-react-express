import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

export const signUp = (name, email, password) =>
  api.post("/api/signup", name, email, password);

export const signIn = (email, password) =>
  api.post("/api/signin", email, password);

export const signOut = () => {
  api.get("/api/signout");
};
