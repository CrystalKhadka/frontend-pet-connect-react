import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";
import Register from "./Register";

// Mock the api
jest.mock("../../apis/Api");

// Test the Register component
describe("Register Component Test", () => {
	// after each test, reset the mock
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

		// Mock toast success
		toast.success = jest.fn();

		render(<Register />);

		//  text field
		const email = screen.getByPlaceholderText("email");
		const password = screen.getByPlaceholderText("password");
		const confirmPassword = screen.getByPlaceholderText("confirm password");
		const fname = screen.getByPlaceholderText("fname");
		const lname = screen.getByPlaceholderText("lname");
		const phone = screen.getByPlaceholderText("phone");
		const address = screen.getByPlaceholderText("address");
		const birthdate = screen.getByPlaceholderText("birth date");
		const submit = screen.getByText("Register");

		// fill the text field
		fireEvent.change(email, { target: { value: "c@gmail.com" } });
		fireEvent.change(password, { target: { value: "12345678" } });
		fireEvent.change(confirmPassword, { target: { value: "12345678" } });
		fireEvent.change(fname, { target: { value: "crystal" } });
		fireEvent.change(lname, { target: { value: "crystal" } });
		fireEvent.change(phone, { target: { value: "1234567890" } });
		fireEvent.change(address, { target: { value: "KTM" } });
		fireEvent.change(birthdate, { target: { value: "2021-10-10" } });

		// click the submit button
		fireEvent.click(submit);

		// check if toast success is called
		await waitFor(() => {
			expect(registerUserApi).toHaveBeenCalledWith({
				email: "c@gmail.com",
				password: "12345678",
				confirmPassword: "12345678",
				fname: "crystal",
				lname: "crystal",
				phone: "1234567890",
				address: "KTM",
				birthdate: "2021-10-10",
			});
		});

		// check if toast success is called
		expect(toast.success).toHaveBeenCalledWith("User Registered Successfully!");
	});
});
