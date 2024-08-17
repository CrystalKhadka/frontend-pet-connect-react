import axios from "axios";

// const baseurl = "http://192.168.137.1:5000";
const baseurl = "http://localhost:5000";

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

const jsonConfig = {
	headers: {
		"Content-Type": "application/json",
		authorization: `Bearer ${localStorage.getItem("token")}`,
	},
};

export const url = baseurl;

// Profile image
export const profileImageUrl = baseurl + "/profile";

// Pet image
export const petImageUrl = baseurl + "/pets";

// Message file
export const messageFileUrl = baseurl + "/messages/files";
export const messageImageUrl = baseurl + "/messages/images";

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

// google login
export const googleLoginApi = (data) => Api.post("/api/user/google", data);

// get by email
export const getUserByGoogleEmail = (data) =>
	Api.post(`/api/user/getGoogleUser`, data);

// get user by id
export const getUserByIdApi = (id) => Api.get(`/api/user/get/${id}`, config);

// get all user
export const getAllUserApi = () => Api.get("/api/user/all", config);

// get current user
export const getCurrentUserApi = () => Api.get("/api/user/getMe", config);

// update user profile
export const updateUserProfileApi = (data) =>
	Api.put("/api/user/update", data, config);

// upload image
export const uploadImageApi = (data) =>
	Api.post("/api/user/upload", data, config);
// ------------------- Pet API -------------------
// Add pet API
export const addPetApi = (data) => Api.post("/api/pet/add", data, config);

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
export const getTotalPetsApi = (species, search) =>
	Api.get(`/api/pet/total?species=${species}&search=${search}`);

// Filter by species
export const filterBySpeciesApi = (species, page, limit, search) =>
	Api.get(
		`/api/pet/filter/species?species=${species}&page=${page}&limit=${limit}&search=${search}`,
	);

// set pet status
export const setPetStatusApi = (id, status) =>
	Api.put(`/api/pet/status/${id}`, status, config);

// get all pets by status: adopted
export const getAllPetsByStatusApi = (id) =>
	Api.get(`/api/pet/all/adopted/${id}`, config);

// Get adopted pets
export const getAdoptedPetsApi = () => Api.get(`/api/pet/adopted/all`, config);

// Set pet adopted
export const setPetAdoptedApi = (data) =>
	Api.put(`/api/pet//set/adopted`, data, config);

// ------------------- Adoption API -------------------

// Adoption Apis
export const addAdoptionApi = (data) =>
	Api.post("/api/adoption/create", data, jsonConfig);

// Get all adoption
export const getAllAdoptionApi = (id) =>
	Api.get(`/api/adoption/get/${id}`, config);

// Get adoption by id
export const countAdoptionApi = () => Api.get(`/api/adoption/count`, config);

// Set adoption status
export const setAdoptionStatusApi = (id, status) =>
	Api.put(`/api/adoption/status/${id}`, status, config);

// Get adoption by form sender
export const getAdoptionBySenderApi = () =>
	Api.get(`/api/adoption/form_sender`, config);

// ------------------- Favorite API -------------------
export const addFavoriteApi = (data) =>
	Api.post("/api/favorite/add", data, config);

export const getFavoriteApi = () => Api.get(`/api/favorite/get`, config);

export const deleteFavoriteApi = (id) =>
	Api.delete(`/api/favorite/delete/${id}`, config);

// Chat api
export const sendMessageApi = (message) =>
	Api.post("/api/messages/send", message, config);
export const getMessagesApi = (id, page) =>
	Api.get(`/api/messages/get/${id}?page=${page}`, config);

export const getByIdApi = (id) =>
	Api.get(`/api/messages/get_by_id/${id}`, config);

export const updateMessageApi = (id, message) =>
	Api.put(`/api/messages/update/${id}`, message, config);

export const deleteMessageApi = (id) =>
	Api.delete(`/api/messages/delete/${id}`, config);

export const getChatListApi = () => Api.get(`/api/messages/get`, config);

export const sendFileApi = (data, config) =>
	Api.post(`/api/messages/send/file`, data, config);

// Notification
export const getNotificationApi = () =>
	Api.get(`/api/notifications/get`, config);

export const readNotificationApi = (id) =>
	Api.put(`/api/notifications/read/${id}`, config);

// send notification
export const sendNotificationApi = (data) =>
	Api.post(`/api/notifications/send`, data, jsonConfig);

// Payment api
export const createPaymentApi = (data) =>
	Api.post(`/api/payment/add`, data, jsonConfig);

export const initiateKhaltiPayment = (data) =>
	Api.post("api/khalti/initiate-payment", data, jsonConfig);

export const verifyKhaltiPayment = (token) =>
	Api.get(`api/khalti/verify-payment/${token}`, jsonConfig);

export const khaltiPayment = (data) =>
	Api.post("api/khalti/payment", data, jsonConfig);
