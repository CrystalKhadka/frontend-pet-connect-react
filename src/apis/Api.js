import axios from "axios";

// Creating backend config
const Api = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

// Test API
export const testApi = () => Api.get("/test");

// Register API
export const registerUserApi = (data) => Api.post("/api/user/register", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);
