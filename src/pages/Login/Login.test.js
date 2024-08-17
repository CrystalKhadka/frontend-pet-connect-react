/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import Login from "./Login";

// Mock the api
jest.mock("../../apis/Api");
jest.mock("react-toastify");

describe("Login Component Test", () => {
	// after each test, reset the mock
	afterEach(() => {
		jest.clearAllMocks();
	});

	// Test 1
	it("Should login on successful login", async () => {
		// Mock the registerUserApi
		const mockResponse = {
			status: 201,
			data: {
				success: true,
				message: "User Logged In Successfully!",
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWNhZGQxMjBmNjcwODZjMzdhNmQ0NCIsInJvbGUiOiJhZG9wdGVyIiwiaWF0IjoxNzIzNzQwMTA5LCJleHAiOjE3MjgwNTU4NDkyODh9.ZhZdyroQrWHwralpCnrhw9lFRJx8ZT4445ubiojiS-s",
				user: {
					id: "66acadd120f67086c37a6d44",
					firstName: "Crystal",
					lastName: "Khadka",
					email: "khadkacrystal23@gmail.com",
					role: "adopter",
					image: "1722865492827-Planet9_Wallpaper_5000x2813.jpg",
				},
			},
		};

		loginUserApi.mockResolvedValue(mockResponse);

		render(
			<Router>
				<GoogleOAuthProvider>
					<Login />
				</GoogleOAuthProvider>
			</Router>,
		);

		fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
			target: { value: "khadkacrystal23@gmail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
			target: { value: "12345678" },
		});

		// Accept terms
		fireEvent.click(screen.getByLabelText("Remember me"));

		// Submit the form
		fireEvent.click(screen.getByText("Log in"));

		// Check if loginUserApi was called with correct data
		await waitFor(() => {
			expect(loginUserApi).toHaveBeenCalledWith({
				email: "khadkacrystal23@gmail.com",
				password: "12345678",
			});
		});

		// Check if the user is logged in
		await waitFor(() => {
			expect(localStorage.getItem("token")).toBe(mockResponse.data.token);
			expect(localStorage.getItem("user")).toBe(
				JSON.stringify(mockResponse.data.user),
			);
		});
	});
	it("Should send toast on unsuccessful login with 400 error", async () => {
		// Mock the loginUserApi to return a failed response with status 400
		const mockResponse = {
			response: {
				status: 400,
				data: {
					success: false,
					message: "User Login Failed",
				},
			},
		};

		loginUserApi.mockRejectedValue(mockResponse);

		// Mock the toast
		toast.warning = jest.fn();

		render(
			<Router>
				<GoogleOAuthProvider clientId="test-client-id">
					<Login />
				</GoogleOAuthProvider>
			</Router>,
		);

		// Simulate user input
		fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
			target: { value: "khadkacrystal23@gmail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
			target: { value: "123456789" },
		});

		// Accept terms
		fireEvent.click(screen.getByLabelText("Remember me"));

		// Submit the form
		fireEvent.click(screen.getByText("Log in"));

		// Check if loginUserApi was called with correct data
		await waitFor(() => {
			expect(loginUserApi).toHaveBeenCalledWith({
				email: "khadkacrystal23@gmail.com",
				password: "123456789",
			});
		});

		// Ensure that the warning toast is called with the correct message
		await waitFor(() => {
			expect(toast.warning).toHaveBeenCalledWith("User Login Failed");
		});
	});

	it("Should send toast on unsuccessful login with 500 error", async () => {
		// Mock the loginUserApi to return a failed response with status 500
		const mockResponse = {
			response: {
				status: 500,
				data: {
					success: false,
					message: "Internal Server Error",
				},
			},
		};

		loginUserApi.mockRejectedValue(mockResponse);

		// Mock the toast
		toast.error = jest.fn();

		render(
			<Router>
				<GoogleOAuthProvider clientId="test-client-id">
					<Login />
				</GoogleOAuthProvider>
			</Router>,
		);

		// Simulate user input
		fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
			target: { value: "khadkacrystal23@gmail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
			target: { value: "123456789" },
		});

		// Accept terms
		fireEvent.click(screen.getByLabelText("Remember me"));

		// Submit the form
		fireEvent.click(screen.getByText("Log in"));

		// Check if loginUserApi was called with correct data
		await waitFor(() => {
			expect(loginUserApi).toHaveBeenCalledWith({
				email: "khadkacrystal23@gmail.com",
				password: "123456789",
			});
		});

		// Ensure that the error toast is called with the correct message
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Internal Server Error");
		});
	});
});
