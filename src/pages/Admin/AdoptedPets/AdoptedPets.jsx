import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdoptedPetsApi, petImageUrl } from "../../../apis/Api";

const AdoptedPets = () => {
	const [adoptedPets, setAdoptedPets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAdoptedPetsApi()
			.then((response) => {
				setAdoptedPets(response.data.pets);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching adopted pets:", error);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:ml-64 md:p-8 md:px-8 md:py-16">
			<h1 className="mb-8 text-3xl font-bold text-gray-800">
				Adopted Pets List
			</h1>

			{isLoading ? (
				<div className="flex justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
				</div>
			) : adoptedPets.length > 0 ? (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{adoptedPets.map((pet) => (
						<div
							key={pet._id}
							className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
						>
							<img
								src={`${petImageUrl}/${pet.petImage}`}
								alt={pet.petName}
								className="h-48 w-full object-cover"
							/>
							<div className="p-4">
								<h2 className="mb-2 text-xl font-semibold text-gray-800">
									{pet.petName}
								</h2>
								<div className="mb-4 space-y-1 text-sm text-gray-600">
									<p>
										<span className="font-medium">Type:</span> {pet.petBreed}
									</p>
									<p>
										<span className="font-medium">Species:</span>{" "}
										{pet.petSpecies}
									</p>
									<p>
										<span className="font-medium">Status:</span>{" "}
										<span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
											{pet.petStatus}
										</span>
									</p>
									<p>
										<span className="font-medium">Adopted By:</span>{" "}
										<span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
											{pet.adoptedBy.firstName} {pet.adoptedBy.lastName}
										</span>
									</p>
								</div>
								<Link
									to={`/admin/adoption/form/${pet._id}`}
									className="mt-2 inline-block w-full rounded bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
								>
									View Details
								</Link>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="rounded-lg bg-white p-8 text-center shadow-md">
					<p className="text-lg text-gray-600">No adopted pets available.</p>
				</div>
			)}
		</div>
	);
};

export default AdoptedPets;
