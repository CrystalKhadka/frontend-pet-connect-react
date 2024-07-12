import React, { useEffect, useState } from "react";
import { countAdoptionApi, petImageUrl } from "../../../apis/Api";

const PetApplicationList = () => {
	const [petApplications, setPetApplications] = useState([]);

	useEffect(() => {
		countAdoptionApi()
			.then((response) => {
				console.log(response.data.adoptions);
				setPetApplications(response.data.adoptions);
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
								<h2 className="text-xl font-semibold">Application List</h2>
							</div>
							<div className="relative overflow-x-auto">
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
												Number of application
											</th>
											<th scope="col" className="px-6 py-3">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{petApplications.map((application, index) => (
											<tr key={index}>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="flex items-center">
														<div className="h-10 w-10 flex-shrink-0">
															<img
																className="h-10 w-10 rounded-full"
																src={`${petImageUrl}/${application.pet.petImage}`}
																alt=""
															/>
														</div>
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm font-medium text-gray-900">
														{application.pet.petName}
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm text-gray-900">
														{application.pet.petBreed}
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm text-gray-900">
														{application.pet.petSpecies}
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
														{application.pet.petStatus}
													</span>
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
													{application.count}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
													<button
														href="#"
														className="text-indigo-600 hover:text-indigo-900"
													>
														View
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default PetApplicationList;
