import React, { useState } from "react";
import { toast } from "react-toastify";
import { addPetApi } from "../../../../apis/Api";

const MyPetList = () => {
	const [petName, setPetName] = useState("");
	const [petBreed, setPetType] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petAge, setPetAge] = useState("");
	const [petWeight, setPetWeight] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petDescription, setPetDescription] = useState("");
	const [petImage, setPetImage] = useState("");
	const [previewImage, setPreviewImage] = useState("");

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		setPetImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// pet owner
		const user = JSON.parse(localStorage.getItem("user"));

		const formData = new FormData();
		formData.append("petName", petName);
		formData.append("petBreed", petBreed);
		formData.append("petSpecies", petSpecies);
		formData.append("petAge", petAge);
		formData.append("petWeight", petWeight);
		formData.append("petColor", petColor);
		formData.append("petDescription", petDescription);
		formData.append("petImage", petImage);
		formData.append("petOwner", user.id);

		// Send formData to the server
		addPetApi(formData)
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 400) {
						toast.warning(error.response.data.message);
					} else if (error.response.status === 500) {
						toast.error(error.response.data.message);
					} else {
						toast.error("Something went wrong!");
					}
				} else {
					toast.error("Something went wrong!");
				}
			});
	};
	return (
		<>
			<div className="md:ml-64 md:px-8 md:py-16">
				<header>
					<h1 className="mb-4 text-center text-2xl">Pet List Admin Panel</h1>
				</header>
				<main>
					<div className="container mx-auto">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-xl font-semibold">Pet List</h2>
								<button
									data-modal-target="default-modal"
									data-modal-toggle="default-modal"
									className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="button"
								>
									Add New Pet
								</button>
							</div>
							<div className="relative overflow-x-auto">
								<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
									<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3">
												Pet Image
											</th>
											<th scope="col" className="px-6 py-3">
												Pet name
											</th>
											<th scope="col" className="px-6 py-3">
												Pet type
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Species
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Age
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Status
											</th>
											<th scope="col" className="px-6 py-3">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="bg-white dark:bg-gray-800">
											<td className="whitespace-nowrap px-6 py-4">
												<div className="flex items-center">
													<div className="h-10 w-10 flex-shrink-0">
														<img
															className="h-10 w-10 rounded-full"
															src="https://images.unsplash.com/photo-1568572933382-4bbf1f3a7f7b"
															alt=""
														/>
													</div>
												</div>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<div className="text-sm font-medium text-gray-900">
													Bella
												</div>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<div className="text-sm text-gray-900">Dog</div>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<div className="text-sm text-gray-900">Labrador</div>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<div className="text-sm text-gray-900">2 years</div>
											</td>
											<td className="whitespace-nowrap px-6 py-4">
												<span className=" inline-flex  rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold leading-5 text-gray-500">
													Pending
												</span>
											</td>
											<td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
												<div className="flex space-x-2">
													<button className="block rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-indigo-600 hover:text-indigo-900 ">
														Edit
													</button>
													<button className="block rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-red-600 hover:text-red-900">
														Delete
													</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>

			<div
				id="default-modal"
				aria-hidden="true"
				className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
			>
				<div className="fixed inset-0  flex  justify-center overflow-auto bg-gray-600 bg-opacity-50">
					<div className="m-auto w-full overflow-auto   rounded-lg bg-white p-6 shadow-lg md:w-1/2 ">
						<div className="flex items-center justify-between rounded-t border-b dark:border-gray-600 ">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Add New Pet
							</h3>
							<button
								type="button"
								class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="default-modal"
							>
								<svg
									class="h-3 w-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
							</button>
						</div>
						<form id="add-pet-form">
							<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-2">
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Name</label>
									<input
										type="text"
										name="name"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetName(e.target.value)}
										required
									/>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Type</label>
									<input
										type="text"
										name="type"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetType(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-4">
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Species</label>
									<input
										type="text"
										name="type"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetSpecies(e.target.value)}
										required
									/>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Age</label>
									<input
										type="number"
										name="age"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetAge(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-4">
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Weight</label>
									<input
										type="number"
										name="type"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetWeight(e.target.value)}
										required
									/>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Color</label>
									<input
										type="number"
										name="age"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetColor(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="petDescription" className="block">
									Pet description
								</label>
								<textarea
									name="petDescription"
									id="petDescription"
									className="w-full rounded-lg border px-4 py-2 "
									onChange={(e) => setPetDescription(e.target.value)}
								></textarea>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700" htmlFor="image">
									Image
								</label>
								<input
									type="file"
									name="image"
									className="w-full border px-4 py-2"
									onChange={handleImageChange}
									required
								/>
							</div>
							{previewImage && (
								<div className="mb-2">
									<img
										src={previewImage}
										className="img-fluid rounded"
										alt="product"
									/>
								</div>
							)}
							<hr />
							<div className="mt-5 flex justify-end">
								<button
									data-modal-toggle="default-modal"
									type="button"
									className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
								>
									Cancel
								</button>
								<button
									className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
									onClick={handleSubmit}
								>
									Add Pet
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyPetList;
