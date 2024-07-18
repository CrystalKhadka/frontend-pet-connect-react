import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	addPetApi,
	deletePetByIdApi,
	petImageUrl,
	viewPetByOwnerApi,
} from "../../../../apis/Api";

const MyPetList = () => {
	const [pets, setPets] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddPetModal, setShowAddPetModal] = useState(false);
	const [petToDelete, setPetToDelete] = useState(null);
	const [newPet, setNewPet] = useState({
		petName: "",
		petBreed: "",
		petSpecies: "",
		petAge: "",
		petWeight: "",
		petColor: "",
		petDescription: "",
		petImage: null,
	});
	const [previewImage, setPreviewImage] = useState("");

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		viewPetByOwnerApi(user.id)
			.then((response) => setPets(response.data.pets))
			.catch((error) => console.error("Error fetching pets:", error));
	}, []);

	const handleInputChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setNewPet({ ...newPet, [name]: files[0] });
			setPreviewImage(URL.createObjectURL(files[0]));
		} else {
			setNewPet({ ...newPet, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = JSON.parse(localStorage.getItem("user"));
		const formData = new FormData();
		Object.keys(newPet).forEach((key) => formData.append(key, newPet[key]));
		formData.append("petOwner", user.id);

		addPetApi(formData)
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
					setShowAddPetModal(false);
					// Refresh pet list
					viewPetByOwnerApi(user.id).then((response) =>
						setPets(response.data.pets),
					);
				}
			})
			.catch((error) => {
				console.error("Error adding pet:", error);
				toast.error("Failed to add pet. Please try again.");
			});
	};

	const handleDelete = () => {
		if (petToDelete) {
			deletePetByIdApi(petToDelete)
				.then((response) => {
					if (response.status === 200) {
						toast.success(response.data.message);
						setPets(pets.filter((pet) => pet._id !== petToDelete));
						setShowDeleteModal(false);
					}
				})
				.catch((error) => {
					console.error("Error deleting pet:", error);
					toast.error("Failed to delete pet. Please try again.");
				});
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-800">My Pets</h1>
				<button
					onClick={() => setShowAddPetModal(true)}
					className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
				>
					<FaPlus className="mr-2" /> Add New Pet
				</button>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{pets.map((pet) => (
					<div
						key={pet._id}
						className="overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-xl"
					>
						<img
							src={`${petImageUrl}/${pet.petImage}`}
							alt={pet.petName}
							className="h-48 w-full object-cover"
						/>
						<div className="p-4">
							<h2 className="mb-2 text-xl font-semibold">{pet.petName}</h2>
							<p className="mb-2 text-gray-600">
								{pet.petSpecies} - {pet.petBreed}
							</p>
							<div className="mb-4 flex items-center">
								<span
									className="mr-2 rounded-full px-2 py-1 text-xs font-semibold"
									style={{
										backgroundColor: pet.petColor,
										color: getContrastColor(pet.petColor),
									}}
								>
									{pet.petColor}
								</span>
								<span
									className={`rounded-full px-2 py-1 text-xs font-semibold ${
										pet.petStatus === "available"
											? "bg-green-200 text-green-800"
											: pet.petStatus === "pending"
												? "bg-yellow-200 text-yellow-800"
												: "bg-red-200 text-red-800"
									}`}
								>
									{pet.petStatus}
								</span>
							</div>
							<div className="flex justify-between">
								<Link
									to={`/admin/myPet/edit/${pet._id}`}
									className="flex items-center text-blue-600 hover:text-blue-800"
								>
									<FaPencilAlt className="mr-1" /> Edit
								</Link>
								<button
									onClick={() => {
										setPetToDelete(pet._id);
										setShowDeleteModal(true);
									}}
									className="flex items-center text-red-600 hover:text-red-800"
								>
									<FaTrash className="mr-1" /> Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Delete Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
						<h3 className="mb-4 text-lg font-semibold">Confirm Deletion</h3>
						<p className="mb-6">
							Are you sure you want to delete this pet? This action cannot be
							undone.
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Add Pet Modal */}
			{showAddPetModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
						<h3 className="mb-4 text-lg font-semibold">Add New Pet</h3>
						<form onSubmit={handleSubmit}>
							<div className="mb-4 grid gap-4 md:grid-cols-2">
								<input
									type="text"
									name="petName"
									placeholder="Pet Name"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								/>
								<select
									name="petSpecies"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								>
									<option value="">Select Species</option>
									<option value="dog">Dog</option>
									<option value="cat">Cat</option>
									<option value="bird">Bird</option>
									<option value="other">Other</option>
								</select>
								<input
									type="text"
									name="petBreed"
									placeholder="Breed"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								/>
								<input
									type="number"
									name="petAge"
									placeholder="Age"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								/>
								<input
									type="number"
									name="petWeight"
									placeholder="Weight (kg)"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								/>
								<input
									type="text"
									name="petColor"
									placeholder="Color"
									onChange={handleInputChange}
									className="w-full rounded-md border p-2"
									required
								/>
							</div>
							<textarea
								name="petDescription"
								placeholder="Pet Description"
								onChange={handleInputChange}
								className="mb-4 w-full rounded-md border p-2"
								rows="3"
								required
							></textarea>
							<input
								type="file"
								name="petImage"
								onChange={handleInputChange}
								className="mb-4 w-full rounded-md border p-2"
								required
							/>
							{previewImage && (
								<img
									src={previewImage}
									alt="Preview"
									className="mb-4 h-32 w-32 rounded-full object-cover"
								/>
							)}
							<div className="flex justify-end space-x-4">
								<button
									type="button"
									onClick={() => setShowAddPetModal(false)}
									className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
								>
									Add Pet
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

// Helper function to determine text color based on background color
function getContrastColor(hexColor) {
	const r = parseInt(hexColor.substr(1, 2), 16);
	const g = parseInt(hexColor.substr(3, 2), 16);
	const b = parseInt(hexColor.substr(5, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "black" : "white";
}

export default MyPetList;
