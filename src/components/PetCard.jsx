/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { petImageUrl } from "../apis/Api";
// import SinglePetModal from "./SinglePetModal";

// const PetCard = ({ pet }) => {
// 	const [toggleModal, setToggleModal] = useState(false);
// 	return (
// 		<>
// 			<div
// 				key={pet._id}
// 				className="mb-6 max-w-sm overflow-hidden rounded-lg bg-white shadow-md "
// 			>
// 				<img
// 					className="h-full min-h-80 w-full"
// 					src={`${petImageUrl}/${pet.petImage}`}
// 					alt={pet.petName}
// 				/>
// 				<div className="p-6">
// 					<div className="mb-4 text-2xl font-bold text-gray-800">
// 						{pet.petName}
// 					</div>
// 					<p className="mb-2 text-lg text-gray-700">
// 						<span className="font-semibold">Species:</span> {pet.petSpecies} (
// 						{pet.petBreed})
// 					</p>
// 					<div className="grid grid-cols-2">
// 						<p className="mb-4 text-lg text-gray-700 ">
// 							<span className="col-6 font-semibold">Age:</span>
// 							{pet.petAge} months
// 						</p>
// 						<p className="mb-4 text-lg text-gray-700 ">
// 							<span className="col-6 font-semibold">Weight:</span>
// 							{pet.petWeight} kg
// 						</p>
// 					</div>
// 					<div className="flex space-x-4">
// 						<button
// 							className="flex-1 rounded bg-gray-500 py-2 text-white hover:bg-gray-600"
// 							onClick={() => {
// 								setToggleModal(!toggleModal);
// 							}}
// 						>
// 							View Details
// 						</button>
// 						<Link
// 							to={`/user/adoption/form/${pet._id}`}
// 							className="flex-1 rounded bg-green-500 py-2 text-white hover:bg-green-600"
// 						>
// 							Adopt Me
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 			{toggleModal && (
// 				<SinglePetModal toggle={() => setToggleModal(!toggleModal)} pet={pet} />
// 			)}
// 		</>
// 	);
// };

// export default PetCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavoriteApi, deleteFavoriteApi, petImageUrl } from "../apis/Api";
import SinglePetModal from "./SinglePetModal";

const PetCard = ({ pet, favorites }) => {
	const [toggleModal, setToggleModal] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		for (let i = 0; i < favorites.length; i++) {
			if (favorites[i].pet._id === pet._id) {
				console.log("Favorite");
				setIsFavorite(true);
				break;
			}
		}
	}, []);

	const handleFavorite = () => {
		console.log("Favorite");

		const data = {
			petId: pet._id,
		};

		console.log(data);

		if (isFavorite) {
			// Remove from favorite
			deleteFavoriteApi(pet._id)
				.then((res) => {
					console.log(res);
					toast.success(res.data.message);
					window.location.reload();
				})
				.catch((err) => {
					if (err.response) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Server Error");
					}
				});
			return;
		} else {
			// Add to favorite
			addFavoriteApi(data)
				.then((res) => {
					console.log(res);
					toast.success(res.data.message);
					window.location.reload();
				})
				.catch((err) => {
					if (err.response) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Server Error");
					}
				});
		}
	};

	return (
		<>
			<div className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
				<div className="relative">
					<img
						className="h-64 w-full object-cover"
						src={`${petImageUrl}/${pet.petImage}`}
						alt={pet.petName}
					/>
					<div className="absolute right-0 top-0 rounded-full  bg-white p-2">
						<button className="" onClick={handleFavorite}>
							<i
								className={`bi ${isFavorite ? "bi-heart-fill text-red-500" : "bi-heart"}`}
							></i>
						</button>
					</div>
				</div>
				<div className="p-6">
					<h2 className="mb-2 text-2xl font-bold text-gray-800">
						{pet.petName}
					</h2>
					<p className="mb-4 text-gray-600">
						{pet.petSpecies} ({pet.petBreed})
					</p>
					<div className="mb-4 flex justify-between">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-1 h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="text-gray-600">{pet.petAge} months</span>
						</div>
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-1 h-5 w-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
								/>
							</svg>
							<span className="text-gray-600">{pet.petWeight} kg</span>
						</div>
					</div>
					<div className="flex space-x-2">
						<button
							className="flex-1 rounded-md bg-indigo-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-indigo-600"
							onClick={() => setToggleModal(!toggleModal)}
						>
							View Details
						</button>
						<Link
							to={`/user/adoption/form/${pet._id}`}
							className="flex-1 rounded-md bg-green-500 px-4 py-2 text-center text-white transition duration-300 ease-in-out hover:bg-green-600"
						>
							Adopt Me
						</Link>
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
