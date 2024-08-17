import React from "react";
import { Link } from "react-router-dom";
import { petImageUrl } from "../apis/Api";

const MyPetCard = ({ singleAdoption }) => {
	return (
		<div className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
			<div className="relative">
				<img
					className="h-56 w-full object-cover"
					src={`${petImageUrl}/${singleAdoption.pet.petImage}`}
					alt={singleAdoption.pet.petName}
				/>
				<div className="absolute right-0 top-0 m-2">
					<span
						className={`rounded-full px-2 py-1 text-xs font-semibold ${
							singleAdoption.status === "approved"
								? "bg-green-500 text-white"
								: singleAdoption.status === "pending"
									? "bg-yellow-500 text-white"
									: "bg-gray-200 text-gray-800"
						}`}
					>
						{singleAdoption.status.charAt(0).toUpperCase() +
							singleAdoption.status.slice(1)}
					</span>
				</div>
			</div>
			<div className="p-4">
				<h2 className="mb-2 text-xl font-bold text-gray-800">
					{singleAdoption.pet.petName}
				</h2>
				<div className="mb-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
					<div>
						<span className="font-semibold">Species:</span>{" "}
						{singleAdoption.pet.petSpecies}
					</div>
					<div>
						<span className="font-semibold">Age:</span>{" "}
						{singleAdoption.pet.petAge} months
					</div>
					<div>
						<span className="font-semibold">Breed:</span>{" "}
						{singleAdoption.pet.petBreed}
					</div>
					<div>
						<span className="font-semibold">Color:</span>{" "}
						{singleAdoption.pet.petColor}
					</div>
				</div>
				<p className="mb-4 text-sm text-gray-500">
					{singleAdoption.pet.petDescription}
				</p>
				<div className="flex items-center justify-between">
					<Link
						to={`/user/pet-details/${singleAdoption.pet._id}`}
						className="text-sm font-semibold text-blue-500 hover:text-blue-700"
					>
						View Details
					</Link>
					<Link
						to={`/user/payment/${singleAdoption.pet._id}`}
						className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
							singleAdoption.status === "pending"
								? "cursor-not-allowed bg-gray-400"
								: "bg-green-500 hover:bg-green-600"
						}`}
						onClick={(e) =>
							singleAdoption.status === "pending" && e.preventDefault()
						}
					>
						Donate
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MyPetCard;
