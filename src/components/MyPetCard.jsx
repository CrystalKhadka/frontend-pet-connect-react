import React from "react";
import { Link } from "react-router-dom";
import { petImageUrl } from "../apis/Api";

const MyPetCard = ({ pet }) => {
	return (
		<div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md">
			<div className="relative">
				<img
					className="h-48 w-full object-cover"
					src={`${petImageUrl}/${pet.petImage}`}
					alt={pet.petName}
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
					<h2 className="text-xl font-bold text-white">{pet.petName}</h2>
				</div>
			</div>
			<div className="p-4">
				<div className="mb-2 flex justify-between text-sm text-gray-600">
					<span>{pet.petSpecies}</span>
					<span>{pet.petAge} months</span>
				</div>
				<div className="flex items-center">
					<i className="bi bi-geo-alt mr-1 text-gray-500"></i>
					<span className="text-sm text-gray-500">Kalanki (3.0 Km)</span>
				</div>
				{/* Status badge */}
				{pet.status && (
					<div
						className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
							pet.status === "adopted"
								? "bg-green-500 text-white"
								: pet.status === "pending"
									? "bg-yellow-500 text-white"
									: "bg-gray-200 text-gray-800"
						}`}
					>
						{pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
					</div>
				)}
				{/* Donation button */}
				<div className="mt-4">
					<Link
						to={`/user/payment/${pet._id}`}
						className={`block w-full rounded-full py-2 text-center text-white ${
							pet.status === "pending"
								? "cursor-not-allowed bg-gray-400"
								: "bg-green-500 hover:bg-green-600"
						}`}
						onClick={(e) => pet.status === "pending" && e.preventDefault()}
					>
						Donate
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MyPetCard;
