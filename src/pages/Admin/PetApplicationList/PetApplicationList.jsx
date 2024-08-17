import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countAdoptionApi, petImageUrl } from "../../../apis/Api";

const PetApplicationList = () => {
	const [petApplications, setPetApplications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		countAdoptionApi()
			.then((response) => {
				setPetApplications(response.data.adoptions);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching pet applications:", error);
				setIsLoading(false);
			});
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "adopted":
				return "bg-blue-100 text-blue-800";
			case "available":
				return "bg-green-100 text-green-800";
			default:
				return "bg-yellow-100 text-yellow-800";
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:ml-64 md:p-8 md:px-8 md:py-16">
			<h1 className="mb-8 text-3xl font-bold text-gray-800">
				Pet Application List
			</h1>

			{isLoading ? (
				<div className="flex justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
				</div>
			) : petApplications.length > 0 ? (
				<div className="overflow-x-auto">
					<ul className="w-full">
						{petApplications.map((application) => (
							<li
								key={application.pet._id}
								className="mb-4 overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
							>
								<div className="flex flex-col sm:flex-row">
									<div className="w-full sm:w-48">
										<img
											src={`${petImageUrl}/${application.pet.petImage}`}
											alt={application.pet.petName}
											className="h-48 w-full object-cover sm:h-full"
										/>
									</div>
									<div className="flex flex-1 flex-col justify-between p-4">
										<div>
											<h2 className="mb-2 text-xl font-semibold text-gray-800">
												{application.pet.petName}
											</h2>
											<div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
												<p>
													<span className="font-medium">Type:</span>{" "}
													{application.pet.petBreed}
												</p>
												<p>
													<span className="font-medium">Species:</span>{" "}
													{application.pet.petSpecies}
												</p>
												<p>
													<span className="font-medium">Status:</span>{" "}
													<span
														className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(application.pet.petStatus)}`}
													>
														{application.pet.petStatus}
													</span>
												</p>
												<p>
													<span className="font-medium">Applications:</span>{" "}
													{application.count}
												</p>
											</div>
										</div>
										<div className="mt-4 text-right">
											<Link
												to={`/admin/adoption/form/${application.pet._id}`}
												className="inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
											>
												View Applications
											</Link>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p className="text-center text-gray-600">
					No pet applications available.
				</p>
			)}
		</div>
	);
};

export default PetApplicationList;
