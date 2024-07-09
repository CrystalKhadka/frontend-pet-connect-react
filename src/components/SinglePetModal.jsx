import React from "react";
import { petImageUrl } from "../apis/Api";

const SinglePetModal = ({ toggle, pet }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
			<div className="relative z-50 flex h-full max-h-96 w-full max-w-5xl rounded-lg bg-white   shadow-lg">
				{/* Pet Image */}
				<div
					className="relative h-auto w-1/2 rounded-l-lg bg-cover bg-center"
					style={{
						backgroundImage: `url(${petImageUrl}/${pet.petImage})`,
					}}
				>
					{/* Heart Icon */}
					<div className="absolute right-0 top-0 text-2xl text-red-500">
						<i className="bi bi-heart"></i>
					</div>
				</div>

				{/* Pet Details */}
				<div className="relative w-1/2 p-5 ">
					{/* Close Button */}
					<button
						className="absolute right-0 top-0 mb-4 mr-3 text-2xl font-bold text-red-500 focus:outline-none"
						onClick={toggle}
					>
						X
					</button>

					{/* Pet Name and Price */}
					<div className="mt-4 flex items-start justify-between">
						<h2 className="text-3xl font-bold text-gray-800">{pet.petName}</h2>
						<p className="text-xl font-bold text-gray-800">Rs. 1000</p>
					</div>

					{/* Location */}
					<p className="flex items-center text-gray-500">
						<i className="bi bi-pin mr-2"></i>
						Kalanki (2.0 Km)
					</p>

					{/* Dog Details */}
					<div className="mt-4 flex justify-between space-x-4  ">
						<p className="flex flex-col items-center  text-center text-gray-600">
							<span className="font-bold">{pet.petColor}</span>
							Color
						</p>
						<p className="flex flex-col items-center text-center text-gray-600">
							<span className="font-bold">{pet.petBreed}</span>
							Breed
						</p>
						<p className="flex flex-col items-center text-center text-gray-600">
							<span className="font-bold">{pet.petWeight} Kg</span>
							Weight
						</p>
					</div>

					{/* User Info */}
					<div className="mt-4 flex items-center rounded-lg bg-red-500 p-2">
						<img
							src={`http://localhost:5000/profile/${pet.createdBy.image}`}
							alt={pet.createdBy.firstName + " " + pet.createdBy.lastName}
							className="h-12 w-12 rounded-full"
						/>
						<div className="ml-4 text-white">
							<p>Owner by:</p>
							<p className="font-bold">
								{pet.createdBy.firstName + " " + pet.createdBy.lastName}
							</p>
						</div>
						<div className="ml-auto flex flex-col items-center text-white">
							<i className="bi bi-chat "></i>
							<p className="text-left">Chat</p>
						</div>
					</div>

					{/* Description */}
					<p className="mt-4 text-sm text-gray-600">{pet.petDescription}</p>

					{/* Adopt Me Button */}
					<button className="mt-6 w-full rounded-full bg-black px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-800">
						Adopt Me
					</button>
				</div>
			</div>
		</div>
	);
};

export default SinglePetModal;
