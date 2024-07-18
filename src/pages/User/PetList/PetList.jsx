import { AdjustmentsIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import {
	filterBySpeciesApi,
	getAllPetBreedApi,
	getFavoriteApi,
	getTotalPetsApi,
} from "../../../apis/Api";
import PetCard from "../../../components/PetCard";

const PetList = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const [pets, setPets] = useState([]);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);
	const [totalPage, setTotalPage] = useState(0);
	const [categories, setCategories] = useState([]);
	const [species, setSpecies] = useState(queryParams.get("category") || "all");
	const [search, setSearch] = useState(queryParams.get("search") || "");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		Promise.all([
			getTotalPetsApi(species, search),
			filterBySpeciesApi(species, page, limit, search),
			getAllPetBreedApi(),
			getFavoriteApi(),
		])
			.then(([totalRes, petsRes, categoriesRes, favoriteRes]) => {
				setTotalPage(Math.ceil(totalRes.data.totalPets / limit));
				setPets(petsRes.data.pets);
				setCategories(categoriesRes.data.species);
				setFavorites(favoriteRes.data.favorites);
			})
			.catch((err) => {
				console.error(err);
				setError("Error fetching data");
			});
	}, [page, limit, species, search 	]);

	const handlePagination = (newPage) => setPage(newPage);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<h1 className="mb-6 text-3xl font-bold text-gray-900">
					Find Your Perfect Pet
				</h1>

				<div className="flex flex-col gap-6 md:flex-row">
					{/* Filter sidebar for medium and larger screens */}
					<aside className="hidden w-full rounded-lg bg-white p-6 shadow-md md:block md:w-1/4">
						<FilterContent
							search={search}
							setSearch={setSearch}
							species={species}
							setSpecies={setSpecies}
							categories={categories}
						/>
					</aside>

					{/* Main content */}
					<main className="w-full md:w-3/4">
						{/* Search bar for mobile */}
						<div className="mb-4 md:hidden">
							<div className="relative">
								<input
									type="text"
									placeholder="Search for breed"
									className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
							</div>
						</div>

						{/* Filter button for mobile */}
						<button
							className="mb-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-600 md:hidden"
							onClick={() => setIsFilterOpen(!isFilterOpen)}
						>
							<AdjustmentsIcon className="h-5 w-5" />
							<span>Filters</span>
						</button>

						{/* Mobile filter modal */}
						{isFilterOpen && (
							<div className="fixed inset-0 z-50 overflow-y-auto md:hidden">
								<div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
									<div
										className="fixed inset-0 transition-opacity"
										aria-hidden="true"
									>
										<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
									</div>
									<div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
										<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
											<FilterContent
												search={search}
												setSearch={setSearch}
												species={species}
												setSpecies={setSpecies}
												categories={categories}
											/>
										</div>
										<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
											<button
												type="button"
												className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
												onClick={() => setIsFilterOpen(false)}
											>
												Apply Filters
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Pet grid */}
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{pets.map((pet) => (
								<PetCard key={pet.id} pet={pet} favorites={favorites} />
							))}
						</div>

						{error && <div className="mt-4 text-red-500">{error}</div>}

						{/* Pagination */}
						<nav className="mt-8 flex justify-center">
							<ul className="flex items-center space-x-1">
								<PaginationButton
									onClick={() => handlePagination(1)}
									disabled={page === 1}
								>
									First
								</PaginationButton>
								<PaginationButton
									onClick={() => handlePagination(page - 1)}
									disabled={page === 1}
								>
									Previous
								</PaginationButton>
								{Array.from({ length: totalPage }, (_, i) => (
									<PaginationButton
										key={i}
										onClick={() => handlePagination(i + 1)}
										active={page === i + 1}
									>
										{i + 1}
									</PaginationButton>
								))}
								<PaginationButton
									onClick={() => handlePagination(page + 1)}
									disabled={page === totalPage}
								>
									Next
								</PaginationButton>
								<PaginationButton
									onClick={() => handlePagination(totalPage)}
									disabled={page === totalPage}
								>
									Last
								</PaginationButton>
							</ul>
						</nav>
					</main>
				</div>
			</div>
		</div>
	);
};

const FilterContent = ({
	search,
	setSearch,
	species,
	setSpecies,
	categories,
}) => (
	<>
		<h2 className="mb-4 text-xl font-semibold text-gray-800">Filters</h2>
		<div className="space-y-4">
			<div>
				<label
					htmlFor="search"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Search
				</label>
				<input
					type="text"
					id="search"
					placeholder="Search for breed"
					className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div>
				<h3 className="mb-1 text-sm font-medium text-gray-700">Category</h3>
				<div className="space-y-2">
					<RadioButton
						id="all"
						name="category"
						value="all"
						checked={species === "all"}
						onChange={() => setSpecies("all")}
						label="All"
					/>
					{categories.map((category) => (
						<RadioButton
							key={category}
							id={category}
							name="category"
							value={category}
							checked={category === species}
							onChange={() => setSpecies(category)}
							label={category}
						/>
					))}
				</div>
			</div>
		</div>
	</>
);

const RadioButton = ({ id, name, value, checked, onChange, label }) => (
	<div className="flex items-center">
		<input
			type="radio"
			id={id}
			name={name}
			value={value}
			checked={checked}
			onChange={onChange}
			className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
		/>
		<label htmlFor={id} className="ml-2 text-sm text-gray-600">
			{label}
		</label>
	</div>
);

const PaginationButton = ({ children, onClick, disabled, active }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className={`rounded-md px-3 py-1 ${
			active
				? "bg-blue-500 text-white"
				: "bg-white text-gray-500 hover:bg-gray-100"
		} ${
			disabled
				? "cursor-not-allowed opacity-50"
				: "hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
		}`}
	>
		{children}
	</button>
);

export default PetList;
