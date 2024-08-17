import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";
import Register from "./Register";

// Mock the API
jest.mock("../../apis/Api");
jest.mock("react-toastify");

// Test the Register component
describe("Register Component Test", () => {
	// After each test, reset the mock
	afterEach(() => {
		jest.clearAllMocks();
	});

	// Test 1
	it("Should show success toast on successful registration", async () => {
		// Mock the registerUserApi
		const mockResponse = {
			status: 201,
			data: {
				success: true,
				message: "User Registered Successfully!",
			},
		};

		registerUserApi.mockResolvedValue(mockResponse);

		render(
			<Router>
				<Register />
			</Router>,
		);

		// Fill out the form
		fireEvent.change(screen.getByPlaceholderText("First Name"), {
			target: { value: "crystal" },
		});
		fireEvent.change(screen.getByPlaceholderText("Last Name"), {
			target: { value: "crystal" },
		});
		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "c@gmail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Password"), {
			target: { value: "12345678" },
		});
		fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
			target: { value: "12345678" },
		});
		fireEvent.change(screen.getByPlaceholderText("Birth Date"), {
			target: { value: "2000-01-01" },
		});
		fireEvent.change(screen.getByPlaceholderText("Phone"), {
			target: { value: "1234567890" },
		});
		fireEvent.change(screen.getByPlaceholderText("Address"), {
			target: { value: "KTM" },
		});

		// Select gender
		fireEvent.click(screen.getByLabelText("Male"));

		// Accept terms
		fireEvent.click(screen.getByLabelText(/I accept the/));

		// Submit the form
		fireEvent.click(screen.getByText("Register Now"));

		// Wait for the modal to appear and select a role
		await waitFor(async () => {
			await fireEvent.click(screen.getByLabelText("Pet Adopter"));
			await fireEvent.click(screen.getByText("Submit"));
		});

		// Check if registerUserApi was called with correct data
		await waitFor(() => {
			expect(registerUserApi).toHaveBeenCalledWith({
				firstName: "crystal",
				lastName: "crystal",
				email: "c@gmail.com",
				password: "12345678",
				birthDate: "2000-01-01",
				phone: "1234567890",
				address: "KTM",
				gender: "male",
				role: "adopter",
			});
		});

		// Check if toast success is called
		expect(toast.success).toHaveBeenCalledWith("User Registered Successfully!");
	});

	// Test 2
	it("Should show warning toast on unsuccessful registration", async () => {
		// Mock the registerUserApi
		const mockResponse = {
			response: {
				status: 400,
				data: {
					success: false,
					message: "User Registration Failed",
				},
			},
		};

		registerUserApi.mockRejectedValue(mockResponse);
		toast.warning = jest.fn();

		render(
			<Router>
				<Register />
			</Router>,
		);

		// Fill out the form
		fireEvent.change(screen.getByPlaceholderText("First Name"), {
			target: { value: "crystal" },
		});
		fireEvent.change(screen.getByPlaceholderText("Last Name"), {
			target: { value: "crystal" },
		});
		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "c@gmail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Password"), {
			target: { value: "12345678" },
		});
		fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
			target: { value: "12345678" },
		});
		fireEvent.change(screen.getByPlaceholderText("Birth Date"), {
			target: { value: "2000-01-01" },
		});
		fireEvent.change(screen.getByPlaceholderText("Phone"), {
			target: { value: "1234567890" },
		});
		fireEvent.change(screen.getByPlaceholderText("Address"), {
			target: { value: "KTM" },
		});

		// Select gender
		fireEvent.click(screen.getByLabelText("Male"));

		// Accept terms
		fireEvent.click(screen.getByLabelText(/I accept the/));

		// Submit the form
		fireEvent.click(screen.getByText("Register Now"));

		// Wait for the modal to appear and select a role
		await waitFor(async () => {
			await fireEvent.click(screen.getByLabelText("Pet Adopter"));
			await fireEvent.click(screen.getByText("Submit"));
		});

		// Check if registerUserApi was called with correct data
		await waitFor(() => {
			expect(registerUserApi).toHaveBeenCalledWith({
				firstName: "crystal",
				lastName: "crystal",
				email: "c@gmail.com",
				password: "12345678",
				birthDate: "2000-01-01",
				phone: "1234567890",
				address: "KTM",
				gender: "male",
				role: "adopter",
			});
		});

		// Check if toast warning is called
		expect(toast.warning).toHaveBeenCalledWith("User Registration Failed");
	});
});
