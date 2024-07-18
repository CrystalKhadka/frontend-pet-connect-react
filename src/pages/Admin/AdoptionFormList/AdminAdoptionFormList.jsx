import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	getAllAdoptionApi,
	setAdoptionStatusApi,
	setPetAdoptedApi,
	viewPetByIdApi,
} from "../../../apis/Api";

const AdminAdoptionForm = () => {
	const params = useParams();
	const [applications, setApplications] = useState([]);
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalAction, setModalAction] = useState("");
	const [pet, setPet] = useState(null);

	useEffect(() => {
		const id = params.id;
		viewPetByIdApi(id)
			.then((res) => {
				setPet(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
		getAllAdoptionApi(id)
			.then((response) => {
				setApplications(response.data.adoption);
			})
			.catch((error) => {
				console.error("Error fetching applications:", error);
				toast.error("Failed to load applications");
			});
	}, [params]);

	const handleStatusChange = (status) => {
		const id = selectedApplication._id;
		const data = { status };

		setAdoptionStatusApi(id, data)
			.then(() => {
				toast.success(`Application ${status} successfully`);
				if (status === "approved") {
					setPetAdoptedApi({
						petId: selectedApplication.pet._id,
						userId: selectedApplication.formReceiver._id,
					});
				}
				setApplications(
					applications.map((app) =>
						app._id === id ? { ...app, status } : app,
					),
				);
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.error(`Error ${status} application:`, error);
				toast.error(error.response?.data?.message || "Something went wrong");
			});
	};

	const openModal = (application, action) => {
		setSelectedApplication(application);
		setModalAction(action);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:ml-64 md:p-8 md:px-8 md:py-16">
			<h2 className="mb-6 text-3xl font-bold text-gray-800">
				Adoption Applications for {pet?.petName ?? "Pet"}
			</h2>

			{applications.length > 0 ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{applications.map((application) => (
						<div
							key={application._id}
							className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
						>
							<h3 className="mb-2 text-xl font-semibold">
								{application.form.fname} {application.form.lname}
							</h3>
							<p className="text-sm text-gray-600">
								Age: {application.form.age}
							</p>
							<p className="text-sm text-gray-600">
								Email: {application.form.email}
							</p>
							<p className="mt-2 text-sm">Reason: {application.form.reason}</p>
							<div className="mt-4">
								<span
									className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
										application.status === "approved"
											? "bg-green-200 text-green-800"
											: application.status === "rejected"
												? "bg-red-200 text-red-800"
												: "bg-yellow-200 text-yellow-800"
									}`}
								>
									{application.status}
								</span>
							</div>
							<div className="mt-4 flex justify-end space-x-2">
								<button
									className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
									onClick={() => openModal(application, "approve")}
									disabled={application.status !== "pending"}
								>
									Approve
								</button>
								<button
									className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
									onClick={() => openModal(application, "reject")}
									disabled={application.status !== "pending"}
								>
									Reject
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-gray-600">
					No applications submitted yet.
				</p>
			)}

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
						<h3 className="mb-4 text-xl font-bold">
							Confirm {modalAction === "approve" ? "Approval" : "Rejection"}
						</h3>
						<p className="mb-6">
							Are you sure you want to {modalAction} this application?
						</p>
						<div className="flex justify-end space-x-2">
							<button
								className="rounded bg-gray-300 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-400"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className={`rounded px-4 py-2 text-white transition-colors ${
									modalAction === "approve"
										? "bg-green-500 hover:bg-green-600"
										: "bg-red-500 hover:bg-red-600"
								}`}
								onClick={() =>
									handleStatusChange(
										modalAction === "approve" ? "approved" : "rejected",
									)
								}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminAdoptionForm;
