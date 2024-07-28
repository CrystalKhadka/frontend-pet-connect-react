import React from "react";
import MyPetCard from "../../components/MyPetCard";

const MyAdoptedPets = () => {
	// Mock data - replace with actual API call
	const adoptedPets = [
		{
			_id: 1,
			petName: "Kitty",
			petSpecies: "Cat",
			petAge: 12,
			petImage: "kitty.jpg",
			status:'adopted'
		},
		{
			_id: 2,
			petName: "Curly",
			petSpecies: "Dog",
			petAge: 24,
			petImage: "curly.jpg",
			status:'pending'
		},
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-2xl font-bold">Adopted Pets</h1>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{adoptedPets.map((pet) => (
					<MyPetCard key={pet._id} pet={pet} />
				))}
			</div>
		</div>
	);
};

export default MyAdoptedPets;
