/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { BrowserRouter as Router } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import {
	filterBySpeciesApi,
	getAllPetBreedApi,
	getTotalPetsApi,
} from "../../../apis/Api";
import PetList from "./PetList";
jest.mock("../../../apis/Api");

describe("Pet List Component", () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.localStorage.setItem(
			"user",
			'{"firstName": "Crystal","lastName": "Khadka","email":"khadkacrystal@gmail.com","role":"adopter"}',
		);
		jest.clearAllMocks();
	});

	it("render pet list component", () => {
		// render petlist
		render(
			<Router>
				<PetList />
			</Router>,
		);

		// check if the component is rendered
		const title = screen.getByText("Find Your Perfect Pet");

		expect(title).toBeInTheDocument();
	});

	it("render pet list component with pets", async () => {
		// Mock the total api
		const mockTotalResponse = {
			data: {
				totalPets: 7,
			},
		};
		getTotalPetsApi.mockResolvedValue(mockTotalResponse);

		//  Mock the all species api
		const mockSpeciesResponse = {
			data: {
				success: true,
				message: "All Species",
				species: ["cat", "dog", "pig"],
			},
			status: 200,
		};

		getAllPetBreedApi.mockResolvedValue(mockSpeciesResponse);

		// Mock the filter by species api
		const mockPetsResponse = {
			data: {
				success: true,
				message: "Pets Fetched",
				pets: [
					{
						_id: "66aa3f84108a429505bdf7a2",
						petName: "doggy",
						petSpecies: "dog",
						petBreed: "German Shepherd",
						petAge: 3,
						petWeight: 5,
						petColor: "black",
						petDescription: "this is German Shepherd",
						petImage: "1722433412169-th.jpg",
						petStatus: "available",
						createdAt: "2024-07-31T13:10:12.395Z",
						createdBy: {
							_id: "66aa3efa108a429505bdf791",
							firstName: "Crystal",
							lastName: "Khadka",
							email: "khadkacrystal@gmail.com",
							password:
								"$2b$10$hUQYZmMSTKmwrFoGno.P9elDvmbz4U.00sxjt54MFWQpnTkQgjdVK",
							role: "owner",
							image: "Crystal_Khadka_1722433274754.png",
							createdAt: "2024-07-31T13:10:11.773Z",
							otp: null,
							otpExpires: null,
							fromGoogle: true,
							__v: 0,
							address: "Chandragiri-15, Tinthana",
							gender: "male",
							phone: "9851015045",
						},
						__v: 0,
					},
					{
						_id: "66aa4084108a429505bdf7b2",
						petName: "kat",
						petSpecies: "cat",
						petBreed: "Himalayan  cat",
						petAge: 2,
						petWeight: 2,
						petColor: "white",
						petDescription: "this is a white cat with many features",
						petImage: "1722433668321-download.jpg",
						petStatus: "available",
						createdAt: "2024-07-31T13:10:12.395Z",
						createdBy: {
							_id: "66aa3efa108a429505bdf791",
							firstName: "Crystal",
							lastName: "Khadka",
							email: "khadkacrystal@gmail.com",
							password:
								"$2b$10$hUQYZmMSTKmwrFoGno.P9elDvmbz4U.00sxjt54MFWQpnTkQgjdVK",
							role: "owner",
							image: "Crystal_Khadka_1722433274754.png",
							createdAt: "2024-07-31T13:10:11.773Z",
							otp: null,
							otpExpires: null,
							fromGoogle: true,
							__v: 0,
							address: "Chandragiri-15, Tinthana",
							gender: "male",
							phone: "9851015045",
						},
						__v: 0,
					},
				],
			},
			status: 200,
		};

		// Mock the get all pets api
		filterBySpeciesApi.mockResolvedValue(mockPetsResponse);

		// render pet list
		render(
			<Router>
				<PetList />
			</Router>,
		);

		// call the api

		await waitFor(() => {
			// check if the total pets is rendered
			expect(getTotalPetsApi).toHaveBeenCalledTimes(1);
			expect(getAllPetBreedApi).toHaveBeenCalledTimes(1);
			expect(filterBySpeciesApi).toHaveBeenCalledTimes(1);

			// find radio button by type
			// const catRadio = screen.getByLabelText("Cat");
			const dogRadio = screen.getByLabelText("dog");
			const allRadio = screen.getByLabelText("All");

			// expect(catRadio).toBeInTheDocument();
			expect(dogRadio).toBeInTheDocument();
			expect(allRadio).toBeInTheDocument();

			const dogName = screen.getByText("doggy");
			const catName = screen.getByText("kat");

			expect(dogName).toBeInTheDocument();
			expect(catName).toBeInTheDocument();
		});
	});
});
