import axios from "axios";

// Creating backend config
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Test API
export const testApi = () => Api.get("/test");

export const registerUserApi = (data) => Api.post("/api/user/register", data);
