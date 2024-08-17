import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "./Homepage";

describe("Homepage Component", () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
	});

	it("should redirect to the admin dashboard if user is an owner", () => {
		// Set a mock user in localStorage
		localStorage.setItem("user", JSON.stringify({ role: "owner" }));

		// Render the Homepage
		render(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>,
		);

		// Check if the redirection occurred
		expect(window.location.pathname).toBe("/admin/dashboard");
	});

	it("should redirect to the user dashboard if user is not an owner", () => {
		// Set a mock user in localStorage
		localStorage.setItem("user", JSON.stringify({ role: "user" }));

		// Render the Homepage
		render(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>,
		);

		// Check if the redirection occurred
		expect(window.location.pathname).toBe("/user/dashboard");
	});

	it("should render the hero section", () => {
		render(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>,
		);

		// Check if the hero section is rendered
		expect(screen.getByText("Find Your Perfect Pet")).toBeInTheDocument();
		expect(
			screen.getByText("Adopt a furry friend today and make a difference!"),
		).toBeInTheDocument();
		expect(screen.getByText("Get Started")).toBeInTheDocument();
	});

	it("should render the about section with the chart", async () => {
		render(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>,
		);

		// Check if the about section is rendered
		expect(screen.getByText("About PetConnect")).toBeInTheDocument();

		// Check if the chart is rendered
		const canvas = screen.getByRole("img");
		expect(canvas).toBeInTheDocument();
	});

	it("should render the contact section", () => {
		render(
			<MemoryRouter>
				<Homepage />
			</MemoryRouter>,
		);

		// Check if the contact section is rendered
		expect(screen.getByText("Contact Us")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Your Message")).toBeInTheDocument();
	});
});
