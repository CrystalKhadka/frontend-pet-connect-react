import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	getAllAdoptionApi,
	setAdoptionStatusApi,
	setPetAdoptedApi,
} from "../../../apis/Api";

const AdminAdoptionForm = () => {
	const params = useParams();
	const [applications, setApplications] = useState([]);
	const [displayApproveModal, setDisplayApproveModal] = useState(false);
	const [displayRejectModal, setDisplayRejectModal] = useState(false);
	const [selectedApplication, setSelectedApplication] = useState({});

	useEffect(() => {
		const id = params.id;
		getAllAdoptionApi(id)
			.then((response) => {
				console.log(response.data.adoption);
				setApplications(response.data.adoption);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [params]);

	const approveApplication = () => {
		const id = selectedApplication._id;
		const data = {
			status: "approved",
		};

		setAdoptionStatusApi(id, data)
			.then((response) => {
				console.log(response);
				toast.success("Application approved successfully");
				setPetAdoptedApi({
					petId: selectedApplication.pet._id,
					userId: selectedApplication.formReceiver._id,
				});
				window.location.reload();
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else {
					toast.error("Something went wrong");
				}
			});
	};

	const rejectApplication = () => {
		const id = selectedApplication._id;
		const data = {
			status: "rejected",
		};

		setAdoptionStatusApi(id, data)
			.then((response) => {
				console.log(response);
				toast.success("Application rejected successfully");
				window.location.reload();
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else {
					toast.error("Something went wrong");
				}
			});
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 md:ml-64 md:px-8 md:py-16">
			<h2 className="mb-4 text-2xl font-semibold text-gray-700">
				Submitted Applications for doggy2
			</h2>
			<div className="rounded-lg bg-white p-4 shadow-lg">
				{applications.length > 0 ? (
					<>
						<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
							<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th className=" px-4 py-2">Full Name</th>
									<th className=" px-4 py-2">Age</th>
									<th className=" px-4 py-2">Email</th>
									<th className=" px-4 py-2">Gender</th>
									<th className=" px-4 py-2">Phone</th>
									<th className=" px-4 py-2">House Type</th>
									<th className=" px-4 py-2">Yard</th>
									<th className=" px-4 py-2">Pet Experience</th>
									<th className=" px-4 py-2">Reason</th>
									<th className=" px-4 py-2">Status</th>
									<th className=" px-4 py-2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{applications.map((application, index) => (
									<tr
										key={index}
										className="h-full border bg-white   dark:bg-gray-600 dark:text-white"
									>
										<td className=" px-4 py-2 text-sm">
											{application.form.fname} {application.form.lname}
										</td>
										<td className=" px-4 py-2">{application.form.age}</td>
										<td className=" px-4 py-2">{application.form.email}</td>
										<td className=" px-4 py-2">{application.form.gender}</td>
										<td className=" px-4 py-2">{application.form.phone}</td>
										<td className=" px-4 py-2">{application.form.houseType}</td>
										<td className=" px-4 py-2">{application.form.yard}</td>
										<td className=" px-4 py-2">
											{application.form.petExperience}
										</td>
										<td className=" px-4 py-2">{application.form.reason}</td>
										<td className=" px-4 py-2">
											<span
												className={
													application.status === "approved"
														? "rounded-md bg-green-500 px-2 py-1 text-green-100"
														: application.status === "rejected"
															? "rounded-md bg-red-500 px-2 py-1 text-red-100"
															: "rounded-md bg-yellow-100 px-2 py-1 text-yellow-700"
												}
											>
												{application.status}
											</span>
										</td>

										<td className="flex  px-4 py-2">
											<button
												className="rounded-md bg-green-500 px-2 py-1 text-white"
												onClick={() => {
													setSelectedApplication(application);
													setDisplayApproveModal(true);
												}}
											>
												Approve
											</button>
											<button
												className="ml-2 rounded-md bg-red-500 px-2 py-1 text-white"
												onClick={() => {
													setSelectedApplication(application);
													setDisplayRejectModal(true);
												}}
											>
												Reject
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						{/* Approve modal */}
						{displayApproveModal && (
							<div
								id="approve-modal"
								tabIndex="-1"
								className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
							>
								<div className="relative max-h-full w-full max-w-md">
									<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
										<button
											type="button"
											className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
											onClick={() => {
												setDisplayApproveModal(false);
											}}
										>
											<svg
												className="h-5 w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
										<div className="p-6 text-center">
											<svg
												className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16h-1v-4h-1m-1 4h-1m6-2h-1m4 0a9 9 0 11-9-9 9 9 0 019 9z"
												/>
											</svg>
											<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
												Are you sure you want to approve this application?
											</h3>
											<button
												type="button"
												className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
												onClick={approveApplication}
											>
												Yes, I'm sure
											</button>
											<button
												type="button"
												className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
												onClick={() => {
													setDisplayApproveModal(false);
												}}
											>
												No, cancel
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
						{/* Reject modal */}
						{displayRejectModal && (
							<div
								id="approve-modal"
								tabIndex="-1"
								className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
							>
								<div className="relative max-h-full w-full max-w-md">
									<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
										<button
											type="button"
											className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
											onClick={() => {
												setDisplayRejectModal(false);
											}}
										>
											<svg
												className="h-5 w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
										<div className="p-6 text-center">
											<svg
												className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M13 16h-1v-4h-1m-1 4h-1m6-2h-1m4 0a9 9 0 11-9-9 9 9 0 019 9z"
												/>
											</svg>
											<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
												Are you sure you want to reject this application?
											</h3>
											<button
												type="button"
												className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
												onClick={rejectApplication}
											>
												Yes, I'm sure
											</button>
											<button
												type="button"
												className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
												onClick={() => {
													setDisplayRejectModal(false);
												}}
											>
												No, cancel
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				) : (
					<p className="text-gray-600">No applications submitted yet.</p>
				)}
			</div>
		</div>
	);
};

export default AdminAdoptionForm;
