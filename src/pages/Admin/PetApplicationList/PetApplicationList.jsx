import React from "react";

const PetApplicationList = () => {
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
								<h2 className="text-xl font-semibold">Application List</h2>
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
												Pet Status
											</th>
											<th scope="col" className="px-6 py-3">
												Number of application
											</th>
											<th scope="col" className="px-6 py-3">
												Actions
											</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default PetApplicationList;
