import axios from "axios";

// Creating backend config
const Api = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

const config = {
	headers: {
		authorization: `Bearer ${localStorage.getItem("token")}`,
	},
};
 
// Test API
export const testApi = () => Api.get("/test");

// Register API
export const registerUserApi = (data) => Api.post("/api/user/register", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Add pet API
export const addPetApi = (data) => Api.post("/api/pet/add", data);

// View pet by owner
export const viewPetByOwnerApi = (id) => Api.get(`/api/pet/all/${id}`, config);

// View pet by id
export const viewPetByIdApi = (id) => Api.get(`/api/pet/get/${id}`, config);

// Delete pet by id
export const deletePetByIdApi = (id) =>
	Api.delete(`/api/pet/delete/${id}`, config);

// Update pet by id
export const updatePetByIdApi = (id, data) =>
	Api.put(`/api/pet/update/${id}`, data, config);
