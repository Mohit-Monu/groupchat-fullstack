import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signIn = (formData) => API.post("/user/login", formData);

export const signUp = (data) => API.post("/user/signup", data);
