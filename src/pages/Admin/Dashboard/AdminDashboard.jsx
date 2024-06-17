/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { getAllPetsApi } from "../../../apis/Api"; // Adjust the import path as necessary

const AdminDashboard = () => {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		// Fetch all pets
		getAllPetsApi()
			.then((res) => setPets(res.data.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const latestPets = pets.slice(-3).reverse();

	return (
		<>
			<div className="ml-64 px-8 py-16">
				<div className="flex-1 bg-gray-100 p-8">
					<header>
						<h1 className="mb-8 text-center text-3xl font-bold">
							Pet Owner Dashboard
						</h1>
					</header>
					<main>
						<div className="container mx-auto">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">Your Pets</h5>
									{latestPets.length > 0 ? (
										<ul>
											{latestPets.map((pet) => (
												<li key={pet._id} className="mb-4 flex items-center">
													<img
														src={`http://localhost:5000/pets/${pet.petImage}`}
														alt={pet.petName}
														className="mr-4 h-16 w-16 rounded-full object-cover"
													/>
													<div>
														<h6 className="text-lg font-semibold">
															{pet.petName}
														</h6>
														<p className="text-gray-700">{pet.petSpecies}</p>
													</div>
												</li>
											))}
											{/* Show more button */}
											<button
												className="text-blue-500"
												onClick={() => {
													window.location.href = "/admin/myPet/list";
													// Redirect to pet profile management
												}}
											>
												Show more
											</button>
										</ul>
									) : (
										<p>No pets available</p>
									)}
								</div>
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">Adoption Status</h5>
									{/* Adoption status information goes here */}
								</div>
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">
										Recent Activities
									</h5>
									{/* Recent activities list goes here */}
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
