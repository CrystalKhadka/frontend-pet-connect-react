/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const AdminDashboard = () => {
	return (
		<>
			<div className="ml-64 px-8 py-16">
				<div className="flex-1 bg-gray-100 p-8">
					<header>
						<h1 className="mb-8 text-center text-3xl font-bold">
							Pet Owner Dashboard
						</h1>
					</header>
					<main>
						<div className="container mx-auto">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">Your Pets</h5>
									{/* Your pets list goes here */}
								</div>
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">Adoption Status</h5>
									{/* Adoption status information goes here */}
								</div>
								<div className="rounded-lg bg-white p-6 shadow-md">
									<h5 className="mb-4 text-xl font-medium">
										Recent Activities
									</h5>
									{/* Recent activities list goes here */}
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
