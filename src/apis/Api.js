import axios from "axios";

const baseurl = "http://192.168.18.7:5000";
// const baseurl = "http://localhost:5000";

// Creating backend config
const Api = axios.create({
	baseURL: baseurl,
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

export const petImageUrl = baseurl + "/pets";

// Test API
export const testApi = () => Api.get("/test");

// ------------------- User API -------------------

// Register API
export const registerUserApi = (data) => Api.post("/api/user/register", data);

// Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Forgot password by email api
export const forgotPasswordByEmailApi = (email) =>
	Api.post("/api/user/forgot/email", email);

// Forgot password by phone api
export const forgotPasswordByPhoneApi = (phone) =>
	Api.post("/api/user/forgot/phone", phone);

export const resetPasswordApi = (data) =>
	Api.post("/api/user/reset/phone", data);

// ------------------- Pet API -------------------
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

// Get all pets
export const getAllPetsApi = () => Api.get("/api/pet/all", config);

// Pagination
export const getPaginationApi = (page, limit) =>
	Api.get(`/api/pet/pagination?page=${page}&limit=${limit}`, config);

// Get Pet Breed
export const getAllPetBreedApi = () => Api.get(`/api/pet/species`);

//  Get Total pets
export const getTotalPetsApi = (species) =>
	Api.get(`/api/pet/total?species=${species}`);

// Filter by species
export const filterBySpeciesApi = (species, page, limit) =>
	Api.get(
		`/api/pet/filter/species?species=${species}&page=${page}&limit=${limit}`,
	);
