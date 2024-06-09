import React from "react";

const MyPetList = () => {
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
									class="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="button"
								>
									Add New Pet
								</button>
							</div>
							<div class="relative overflow-x-auto">
								<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
									<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" class="px-6 py-3">
												Pet Image
											</th>
											<th scope="col" class="px-6 py-3">
												Pet name
											</th>
											<th scope="col" class="px-6 py-3">
												Pet type
											</th>
											<th scope="col" class="px-6 py-3">
												Pet Species
											</th>
											<th scope="col" class="px-6 py-3">
												Pet Age
											</th>
											<th scope="col" class="px-6 py-3">
												Pet Status
											</th>
											<th scope="col" class="px-6 py-3">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="bg-white dark:bg-gray-800">
											<td class="whitespace-nowrap px-6 py-4">
												<div class="flex items-center">
													<div class="h-10 w-10 flex-shrink-0">
														<img
															class="h-10 w-10 rounded-full"
															src="https://images.unsplash.com/photo-1568572933382-4bbf1f3a7f7b"
															alt=""
														/>
													</div>
												</div>
											</td>
											<td class="whitespace-nowrap px-6 py-4">
												<div class="text-sm font-medium text-gray-900">
													Bella
												</div>
											</td>
											<td class="whitespace-nowrap px-6 py-4">
												<div class="text-sm text-gray-900">Dog</div>
											</td>
											<td class="whitespace-nowrap px-6 py-4">
												<div class="text-sm text-gray-900">Labrador</div>
											</td>
											<td class="whitespace-nowrap px-6 py-4">
												<div class="text-sm text-gray-900">2 years</div>
											</td>
											<td class="whitespace-nowrap px-6 py-4">
												<span class=" inline-flex  rounded-full bg-yellow-100 px-4 py-2 text-xs font-semibold leading-5 text-gray-500">
													Pending
												</span>
											</td>
											<td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
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
				tabindex="-1"
				aria-hidden="true"
				class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
			>
				<div className="fixed inset-0 flex  items-center justify-center bg-gray-600 bg-opacity-50">
					<div className="m-4 w-full rounded-lg bg-white p-6 shadow-lg md:w-1/2">
						<h2 className="mb-4 text-xl font-semibold">Add New Pet</h2>
						<form id="add-pet-form">
							<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-4">
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Name</label>
									<input
										type="text"
										name="name"
										className="w-full rounded-lg border px-4 py-2"
										required
									/>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Type</label>
									<input
										type="text"
										name="type"
										className="w-full rounded-lg border px-4 py-2"
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
										required
									/>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Age</label>
									<input
										type="number"
										name="age"
										className="w-full rounded-lg border px-4 py-2"
										required
									/>
								</div>
							</div>
							<hr />
							<div className="flex justify-end">
								<button
									data-modal-toggle="default-modal"
									type="button"
									className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
