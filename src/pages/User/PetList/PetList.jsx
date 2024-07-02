import React, { useEffect, useState } from "react";
import {
	filterBySpeciesApi,
	getAllPetBreedApi,
	getTotalPetsApi,
} from "../../../apis/Api";
import PetCard from "../../../components/PetCard";

const PetList = () => {
	const [pets, setPets] = useState([]);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);
	const [totalPage, setTotalPage] = useState(0);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("all");

	useEffect(() => {
		getTotalPetsApi(category)
			.then((res) => {
				setTotalPage(Math.ceil(res.data.totalPets / limit));
			})
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
		filterBySpeciesApi(category, page, limit)
			.then((res) => {
				setPets(res.data.pets);
			})
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
		getAllPetBreedApi()
			.then((res) => {
				setCategories(res.data.species);
			})
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
	}, [page, limit, category]);

	const handlePagination = (page) => {
		setPage(page);
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			<aside className="h-full w-1/4 bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-2xl font-bold text-gray-800">
					Search and Filter
				</h2>
				<div className="mb-4">
					<input
						type="text"
						placeholder="Search for breed"
						className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
					/>
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-semibold text-gray-700">
						Filter by distance
					</h3>
					<ul className="space-y-2">
						<li>
							<input
								type="radio"
								id="2km"
								name="distance"
								value="2km"
								defaultChecked
							/>
							<label htmlFor="2km" className="ml-2 text-gray-600">
								2 KM
							</label>
						</li>
						<li>
							<input type="radio" id="5km" name="distance" value="5km" />
							<label htmlFor="5km" className="ml-2 text-gray-600">
								5 KM
							</label>
						</li>
						<li>
							<input type="radio" id="10km" name="distance" value="10km" />
							<label htmlFor="10km" className="ml-2 text-gray-600">
								10 KM
							</label>
						</li>
					</ul>
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-semibold text-gray-700">
						Filter by category
					</h3>
					<ul className="space-y-2">
						<li>
							<input
								type="radio"
								id="all"
								name="category"
								value="all"
								onChange={() => {
									setCategory("");
								}}
							/>
							<label htmlFor="all" className="ml-2 text-gray-600">
								all
							</label>
						</li>
						{categories.map((category) => (
							<li>
								<input
									type="radio"
									id={category}
									name="category"
									value={category}
									onChange={(e) => {
										setCategory(e.target.value);
									}}
								/>
								<label htmlFor={category} className="ml-2 text-gray-600">
									{category}
								</label>
							</li>
						))}
					</ul>
				</div>
				<button className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
					Filter
				</button>
			</aside>

			<div className="flex-1 p-6">
				<main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{pets.map((pet) => (
						<div key={pet.id} className="col">
							<PetCard pet={pet} />
						</div>
					))}
				</main>
				{error && <div className="mt-4 text-red-500">{error}</div>}
				<nav className="mt-6 flex justify-center">
					<ul className="inline-flex items-center -space-x-px">
						<li>
							<button
								onClick={() => handlePagination(1)}
								disabled={page === 1}
								className="flex h-10 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
							>
								Start
							</button>
						</li>
						<li>
							<button
								onClick={() => handlePagination(page - 1)}
								disabled={page === 1}
								className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
							>
								Previous
							</button>
						</li>
						{Array.from({ length: totalPage }, (_, i) => (
							<li key={i}>
								<button
									onClick={() => handlePagination(i + 1)}
									className={`flex h-10 items-center justify-center border border-gray-300  px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
										page === i + 1
											? "bg-blue-500 text-white"
											: "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
									}`}
								>
									{i + 1}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={() => handlePagination(page + 1)}
								disabled={page === totalPage}
								className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
							>
								Next
							</button>
						</li>
						<li>
							<button
								onClick={() => handlePagination(totalPage)}
								disabled={page === totalPage}
								className="flex h-10 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
							>
								End
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default PetList;
