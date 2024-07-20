/* eslint-disable no-unused-vars */

import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
	getAllPetBreedApi,
	getPaginationApi,
	petImageUrl,
} from "../../../apis/Api";

const UserDashboard = () => {
	const [pets, setPets] = useState([]);
	const [page, setPage] = useState(1);
	const [species, setSpecies] = useState([]);
	const [speciesFilter, setSpeciesFilter] = useState("");
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([getAllPetBreedApi(), getPaginationApi(page, 8)])
			.then(([speciesRes, petsRes]) => {
				setSpecies(speciesRes.data.species);
				setPets(petsRes.data.pets);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [page]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
						Every Pet Deserves a Loving Home
					</h1>
					<p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
						Adopt a furry friend today and bring joy to your family
					</p>
				</div>

				<div className="mt-10">
					<form className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<select
							className="w-full rounded-md border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:w-auto"
							onChange={(e) => setSpeciesFilter(e.target.value)}
						>
							<option value="all">All Species</option>
							{species.map((breed) => (
								<option key={breed} value={breed}>
									{breed}
								</option>
							))}
						</select>
						<div className="relative flex-grow rounded-md shadow-sm">
							<input
								type="text"
								className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Search for breed"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center">
								<Link
									to={`/user/pet/list?category=${speciesFilter}&search=${search}`}
									className="inline-flex items-center rounded-r-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<SearchIcon className="mr-2 h-5 w-5" aria-hidden="true" />
									Search
								</Link>
							</div>
						</div>
					</form>
				</div>

				<div className="mt-16">
					{isLoading ? (
						<p className="text-center text-xl font-semibold">Loading...</p>
					) : pets.length > 0 ? (
						<Slider {...settings}>
							{pets.map((pet) => (
								<div key={pet._id} className="px-2">
									<div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
										<img
											src={petImageUrl + "/" + pet.petImage}
											alt={pet.petName}
											className="h-48 w-full object-cover"
										/>
										<div className="p-4">
											<h3 className="text-lg font-semibold text-gray-900">
												{pet.petName}
											</h3>
											<p className="text-sm text-gray-500">{pet.petSpecies}</p>
											<Link
												to={`/user/pet/${pet._id}`}
												className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												Learn More
											</Link>
										</div>
									</div>
								</div>
							))}
						</Slider>
					) : (
						<p className="text-center text-2xl font-bold text-red-500">
							No pets available
						</p>
					)}
				</div>

				<div className="mt-10 flex justify-center">
					<nav
						className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<button
							onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							Previous
						</button>
						<button
							onClick={() => setPage((prev) => prev + 1)}
							className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							Next
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
