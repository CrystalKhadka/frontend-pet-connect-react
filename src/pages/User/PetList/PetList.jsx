import React, { useEffect, useState } from "react";
import { getAllPetsApi } from "../../../apis/Api";
import PetCard from "../../../components/PetCard";

const PetList = () => {
	const [pets, setPets] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		getAllPetsApi()
			.then((res) => setPets(res.data.pets))
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
	}, []);
	return (
		<div className="flex min-h-lvh bg-gray-100">
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
								id="dog"
								name="category"
								value="dog"
								defaultChecked
							/>
							<label htmlFor="dog" className="ml-2 text-gray-600">
								Dog
							</label>
						</li>
						<li>
							<input type="radio" id="cat" name="category" value="cat" />
							<label htmlFor="cat" className="ml-2 text-gray-600">
								Cat
							</label>
						</li>
						<li>
							<input type="radio" id="others" name="category" value="others" />
							<label htmlFor="others" className="ml-2 text-gray-600">
								Others
							</label>
						</li>
					</ul>
				</div>
				<button className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
					Filter
				</button>
			</aside>
			<main className="grid w-3/4 grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
				{pets.map((pet) => (
					<div class="col">
						<PetCard pet={pet} />
					</div>
				))}
			</main>
		</div>
	);
};

export default PetList;
