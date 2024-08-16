import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { getAllPetBreedApi, getPaginationApi } from "../../../apis/Api";
import UserDashboard from "./UserDashboard";

// Mock the API calls
jest.mock("../../../apis/Api");

describe("UserDashboard Component Test", () => {
  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should display loading initially", () => {
    // Mock initial API responses
    getAllPetBreedApi.mockResolvedValueOnce({ data: { species: [] } });
    getPaginationApi.mockResolvedValueOnce({ data: { pets: [] } });

    // Render the component
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    // Assert that the loading state is shown
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("Should display pet cards after loading", async () => {
    // Mock API responses
    getAllPetBreedApi.mockResolvedValueOnce({
      data: { species: ["Dog", "Cat"] },
    });
    getPaginationApi.mockResolvedValueOnce({
      data: {
        pets: [
          { _id: "1", petName: "Buddy", petSpecies: "Dog", petImage: "buddy.jpg" },
          { _id: "2", petName: "Mittens", petSpecies: "Cat", petImage: "mittens.jpg" },
        ],
      },
    });

    // Render the component
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    // Wait for the pets to be loaded and rendered
    await waitFor(() => {
        expect(screen.getByText("Buddy")).toBeInTheDocument();
        
    });

    // Assert that the pet images are correct
    expect(screen.getByAltText("Buddy")).toHaveAttribute("src", expect.stringContaining("buddy.jpg"));
    expect(screen.getByAltText("Mittens")).toHaveAttribute("src", expect.stringContaining("mittens.jpg"));
  });

  it("Should display 'No pets available' when API returns no pets", async () => {
    // Mock the API responses to return no pets
    getAllPetBreedApi.mockResolvedValueOnce({ data: { species: [] } });
    getPaginationApi.mockResolvedValueOnce({ data: { pets: [] } });

    // Render the component
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    // Wait for the pets data to be fetched
    await waitFor(() => {
      expect(screen.getByText(/No pets available/i)).toBeInTheDocument();
    });
  });

  it("Should allow pagination", async () => {
    // Mock initial API responses for page 1
    getAllPetBreedApi.mockResolvedValueOnce({ data: { species: [] } });
    getPaginationApi.mockResolvedValueOnce({
      data: {
        pets: [
          { _id: "1", petName: "Buddy", petSpecies: "Dog", petImage: "buddy.jpg" },
        ],
      },
    });

    // Render the component
    render(
      <Router>
        <UserDashboard />
      </Router>
    );

    // Wait for the first page to load
    await waitFor(() => {
      expect(screen.getByText("Buddy")).toBeInTheDocument();
    });

    // Mock the API for the next page
    getPaginationApi.mockResolvedValueOnce({
      data: {
        pets: [
          { _id: "2", petName: "Mittens", petSpecies: "Cat", petImage: "mittens.jpg" },
        ],
      },
    });

    // Simulate clicking the "Next" button for pagination
    fireEvent.click(screen.getByText(/Next/i));

    // Wait for the second page to load
    await waitFor(() => {
      expect(screen.getByText("Mittens")).toBeInTheDocument();
    });
  });
});
