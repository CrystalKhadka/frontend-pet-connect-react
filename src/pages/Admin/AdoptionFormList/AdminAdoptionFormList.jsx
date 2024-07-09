import React, { useEffect, useState } from "react";

const AdminAdoptionForm = () => {
	const [applications, setApplications] = useState([]);

	useEffect(() => {
		const demoApplications = [
			{
				firstName: "John",
				lastName: "Doe",
				age: 25,
				email: "john.doe@example.com",
				gender: "male",
				phone: "1234567890",
				houseType: "apartment",
				yard: "no",
				petExperience: "yes",
				reason: "I love pets",
			},
			{
				firstName: "Jane",
				lastName: "Doe",
				age: 30,
				email: "jane.doe@example.com",
				gender: "female",
				phone: "0987654321",
				houseType: "house",
				yard: "yes",
				petExperience: "no",
				reason: "I want a companion",
			},
		];
		// Fetch applications from the server
		setApplications(demoApplications);
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:ml-64 md:px-8 md:py-16">
			<h2 className="mb-4 text-2xl font-semibold text-gray-700">
				Submitted Applications for doggy2
			</h2>
			<div className="rounded-lg bg-white p-4 shadow-lg">
				{applications.length > 0 ? (
					<table className="min-w-full border-collapse">
						<thead>
							<tr>
								<th className="border px-4 py-2">First Name</th>
								<th className="border px-4 py-2">Last Name</th>
								<th className="border px-4 py-2">Age</th>
								<th className="border px-4 py-2">Email</th>
								<th className="border px-4 py-2">Gender</th>
								<th className="border px-4 py-2">Phone</th>
								<th className="border px-4 py-2">House Type</th>
								<th className="border px-4 py-2">Yard</th>
								<th className="border px-4 py-2">Pet Experience</th>
								<th className="border px-4 py-2">Reason</th>
							</tr>
						</thead>
						<tbody>
							{applications.map((application, index) => (
								<tr key={index}>
									<td className="border px-4 py-2">{application.firstName}</td>
									<td className="border px-4 py-2">{application.lastName}</td>
									<td className="border px-4 py-2">{application.age}</td>
									<td className="border px-4 py-2">{application.email}</td>
									<td className="border px-4 py-2">{application.gender}</td>
									<td className="border px-4 py-2">{application.phone}</td>
									<td className="border px-4 py-2">{application.houseType}</td>
									<td className="border px-4 py-2">{application.yard}</td>
									<td className="border px-4 py-2">
										{application.petExperience}
									</td>
									<td className="border px-4 py-2">{application.reason}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="text-gray-600">No applications submitted yet.</p>
				)}
			</div>
		</div>
	);
};

export default AdminAdoptionForm;
