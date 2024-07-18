// import React from "react";
// import { petImageUrl } from "../apis/Api";

// const SinglePetModal = ({ toggle, pet }) => {
// 	return (
// 		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
// 			<div className="relative z-50 flex h-full max-h-96 w-full max-w-5xl rounded-lg bg-white   shadow-lg">
// 				{/* Pet Image */}
// 				<div
// 					className="relative h-auto w-1/2 rounded-l-lg bg-cover bg-center"
// 					style={{
// 						backgroundImage: `url(${petImageUrl}/${pet.petImage})`,
// 					}}
// 				>
// 					{/* Heart Icon */}
// 					<div className="absolute right-0 top-0 text-2xl text-red-500">
// 						<i className="bi bi-heart"></i>
// 					</div>
// 				</div>

// 				{/* Pet Details */}
// 				<div className="relative w-1/2 p-5 ">
// 					{/* Close Button */}
// 					<button
// 						className="absolute right-0 top-0 mb-4 mr-3 text-2xl font-bold text-red-500 focus:outline-none"
// 						onClick={toggle}
// 					>
// 						X
// 					</button>

// 					{/* Pet Name and Price */}
// 					<div className="mt-4 flex items-start justify-between">
// 						<h2 className="text-3xl font-bold text-gray-800">{pet.petName}</h2>
// 						<p className="text-xl font-bold text-gray-800">Rs. 1000</p>
// 					</div>

// 					{/* Location */}
// 					<p className="flex items-center text-gray-500">
// 						<i className="bi bi-pin mr-2"></i>
// 						Kalanki (2.0 Km)
// 					</p>

// 					{/* Dog Details */}
// 					<div className="mt-4 flex justify-between space-x-4  ">
// 						<p className="flex flex-col items-center  text-center text-gray-600">
// 							<span className="font-bold">{pet.petColor}</span>
// 							Color
// 						</p>
// 						<p className="flex flex-col items-center text-center text-gray-600">
// 							<span className="font-bold">{pet.petBreed}</span>
// 							Breed
// 						</p>
// 						<p className="flex flex-col items-center text-center text-gray-600">
// 							<span className="font-bold">{pet.petWeight} Kg</span>
// 							Weight
// 						</p>
// 					</div>

// 					{/* User Info */}
// 					<div className="mt-4 flex items-center rounded-lg bg-red-500 p-2">
// 						<img
// 							src={`http://localhost:5000/profile/${pet.createdBy.image}`}
// 							alt={pet.createdBy.firstName + " " + pet.createdBy.lastName}
// 							className="h-12 w-12 rounded-full"
// 						/>
// 						<div className="ml-4 text-white">
// 							<p>Owner by:</p>
// 							<p className="font-bold">
// 								{pet.createdBy.firstName + " " + pet.createdBy.lastName}
// 							</p>
// 						</div>
// 						<div className="ml-auto flex flex-col items-center text-white">
// 							<i className="bi bi-chat "></i>
// 							<p className="text-left">Chat</p>
// 						</div>
// 					</div>

// 					{/* Description */}
// 					<p className="mt-4 text-sm text-gray-600">{pet.petDescription}</p>

// 					{/* Adopt Me Button */}
// 					<button className="mt-6 w-full rounded-full bg-black px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-800">
// 						Adopt Me
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default SinglePetModal;

import React from "react";
import { Link } from "react-router-dom";
import { petImageUrl } from "../apis/Api";

const SinglePetModal = ({ toggle, pet }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="relative z-50 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
				<button
					className="absolute right-0 top-0 z-10 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
					onClick={toggle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="flex flex-col md:flex-row">
					<div className="relative w-full md:w-1/2">
						<img
							src={`${petImageUrl}/${pet.petImage}`}
							alt={pet.petName}
							className="h-64 w-full object-cover md:h-full"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
							<h2 className="text-3xl font-bold text-white">{pet.petName}</h2>
							<p className="text-xl text-white">
								{pet.petSpecies} • {pet.petBreed}
							</p>
						</div>
					</div>

					<div className="w-full bg-gray-50 p-6 md:w-1/2">
						<div className="mb-6">
							<h3 className="mb-2 text-2xl font-semibold text-gray-800">
								Pet Details
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="rounded-lg bg-white p-3 shadow">
									<p className="text-sm text-gray-600">Age</p>
									<p className="text-lg font-semibold">{pet.petAge} months</p>
								</div>
								<div className="rounded-lg bg-white p-3 shadow">
									<p className="text-sm text-gray-600">Weight</p>
									<p className="text-lg font-semibold">{pet.petWeight} kg</p>
								</div>
								<div className="rounded-lg bg-white p-3 shadow">
									<p className="text-sm text-gray-600">Color</p>
									<p className="text-lg font-semibold">{pet.petColor}</p>
								</div>
								<div className="rounded-lg bg-white p-3 shadow">
									<p className="text-sm text-gray-600">Gender</p>
									<p className="text-lg font-semibold">{pet.petGender}</p>
								</div>
							</div>
						</div>

						<div className="mb-6">
							<h3 className="mb-2 text-2xl font-semibold text-gray-800">
								About {pet.petName}
							</h3>
							<p className="text-gray-600">{pet.petDescription}</p>
						</div>

						<div className="mb-6 rounded-lg bg-white p-4 shadow">
							<h3 className="mb-2 text-xl font-semibold text-gray-800">
								Meet the Caretaker
							</h3>
							<div className="flex items-center">
								<img
									src={`http://localhost:5000/profile/${pet.createdBy.image}`}
									alt={pet.createdBy.firstName + " " + pet.createdBy.lastName}
									className="mr-4 h-12 w-12 rounded-full"
								/>
								<div>
									<p className="font-semibold">
										{pet.createdBy.firstName + " " + pet.createdBy.lastName}
									</p>
									<p className="text-sm text-gray-600">
										Caring for {pet.petName} since [Date]
									</p>
								</div>
							</div>
						</div>

						<div className="flex space-x-4">
							<Link
								to={`/user/adoption/form/${pet._id}`}
								className="flex flex-1 items-center justify-center rounded-md bg-green-500 py-3 text-center text-white transition duration-300 ease-in-out hover:bg-green-600"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
										clipRule="evenodd"
									/>
								</svg>
								Adopt {pet.petName}
							</Link>
							<button
								className="flex flex-1 items-center justify-center rounded-md bg-blue-500 py-3 text-center text-white transition duration-300 ease-in-out hover:bg-blue-600"
								onClick={() => {
									/* Implement chat functionality */
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
										clipRule="evenodd"
									/>
								</svg>
								Chat with Caretaker
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SinglePetModal;
