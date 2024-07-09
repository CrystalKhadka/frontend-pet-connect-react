import React, { useState } from "react";
import { petImageUrl } from "../apis/Api";
import SinglePetModal from "./SinglePetModal";

const PetCard = ({ pet, onClick }) => {
	const [toggleModal, setToggleModal] = useState(false);
	return (
		<>
			<div
				key={pet._id}
				className="mb-6 max-w-sm overflow-hidden rounded-lg bg-white shadow-md "
			>
				<img
					className="h-full min-h-80 w-full"
					src={`${petImageUrl}/${pet.petImage}`}
					alt={pet.petName}
				/>
				<div className="p-6">
					<div className="mb-4 text-2xl font-bold text-gray-800">
						{pet.petName}
					</div>
					<p className="mb-2 text-lg text-gray-700">
						<span className="font-semibold">Species:</span> {pet.petSpecies} (
						{pet.petBreed})
					</p>
					<div className="grid grid-cols-2">
						<p className="mb-4 text-lg text-gray-700 ">
							<span className="col-6 font-semibold">Age:</span>
							{pet.petAge} months
						</p>
						<p className="mb-4 text-lg text-gray-700 ">
							<span className="col-6 font-semibold">Weight:</span>
							{pet.petWeight} kg
						</p>
					</div>
					<div className="flex space-x-4">
						<button
							className="flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600"
							onClick={() => {
								setToggleModal(!toggleModal);
							}}
						>
							View Details
						</button>
						<button className="flex-1 rounded bg-green-500 py-2 text-white hover:bg-green-600">
							Adopt Me
						</button>
					</div>
				</div>
			</div>
			{toggleModal && (
				<SinglePetModal toggle={() => setToggleModal(!toggleModal)} pet={pet} />
			)}
		</>
	);
};

export default PetCard;
