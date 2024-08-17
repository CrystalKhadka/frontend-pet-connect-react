import React, { useEffect, useState } from "react";
import { getAdoptionBySenderApi } from "../../apis/Api";
import MyPetCard from "../../components/MyPetCard";

const MyAdoptedPets = () => {
	// Using the provided JSON data

	const [adoptedPets, setAdoptedPets] = useState([]);

	useEffect(() => {
		getAdoptionBySenderApi()
			.then((res) => {
				setAdoptedPets(res.data.adoption);
			})
			.catch((e) => {
				console.error("Error fetching adopted pets:", e);
			});
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
				My Adopted Pets
			</h1>

			{adoptedPets.length === 0 ? (
				<p className="mt-8 text-center text-gray-600">
					You haven't adopted any pets yet.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{adoptedPets.map((singleAdoption) => (
						<MyPetCard
							key={singleAdoption._id}
							singleAdoption={singleAdoption}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default MyAdoptedPets;
