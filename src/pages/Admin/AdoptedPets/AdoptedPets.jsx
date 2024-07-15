import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdoptedPetsApi, petImageUrl } from "../../../apis/Api";

const AdoptedPets = () => {
	const [adoptedPets, setAdoptedPets] = useState([]);

	useEffect(() => {
		getAdoptedPetsApi()
			.then((response) => {
				setAdoptedPets(response.data.pets);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<div className="md:ml-64 md:px-8 md:py-16">
				<header>
					<h1 className="mb-4 text-center text-2xl">Pet List Admin Panel</h1>
				</header>
				<main>
					<div className="container mx-auto">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-xl font-semibold">Adopted Pets List</h2>
							</div>
							<div className="relative overflow-x-auto">
								{adoptedPets.length > 0 ? (
									<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
										<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
											<tr>
												<th scope="col" className="px-6 py-3">
													Pet Image
												</th>
												<th scope="col" className="px-6 py-3">
													Pet name
												</th>
												<th scope="col" className="px-6 py-3">
													Pet type
												</th>
												<th scope="col" className="px-6 py-3">
													Pet Species
												</th>
												<th scope="col" className="px-6 py-3">
													Pet Status
												</th>

												<th scope="col" className="px-6 py-3">
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{adoptedPets.map((pet, index) => (
												<tr key={index}>
													<td className="whitespace-nowrap px-6 py-4">
														<div className="flex items-center">
															<div className="h-10 w-10 flex-shrink-0">
																<img
																	className="h-10 w-10 rounded-full"
																	src={`${petImageUrl}/${pet.petImage}`}
																	alt=""
																/>
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-6 py-4">
														<div className="text-sm font-medium text-gray-900">
															{pet.petName}
														</div>
													</td>
													<td className="whitespace-nowrap px-6 py-4">
														<div className="text-sm text-gray-900">
															{pet.petBreed}
														</div>
													</td>
													<td className="whitespace-nowrap px-6 py-4">
														<div className="text-sm text-gray-900">
															{pet.petSpecies}
														</div>
													</td>
													<td className="whitespace-nowrap px-6 py-4">
														<span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
															{pet.petStatus}
														</span>
													</td>

													<td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
														<Link
															to={`/admin/adoption/form/${pet._id}`}
															className="text-indigo-600 hover:text-indigo-900"
														>
															View
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<div className="text-center">No adopted pets</div>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default AdoptedPets;
