import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	addAdoptionApi,
	setPetStatusApi,
	viewPetByIdApi,
} from "../../apis/Api";

const AdoptionForm = () => {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [age, setAge] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("m");
	const [phone, setPhone] = useState("");
	const [houseType, setHouseType] = useState("House");
	const [yard, setYard] = useState("Yard");
	const [petExperience, setPetExperience] = useState("");
	const [reason, setReason] = useState("");
	const [pet, setPet] = useState("");

	const param = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(param.id);
		const form = {
			fname,
			lname,
			age,
			email,
			gender,
			phone,
			houseType,
			yard,
			petExperience,
			reason,
		};

		viewPetByIdApi(param.id)
			.then((res) => {
				setPet(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});

		console.log(pet);
		const formData = JSON.stringify(form);

		const data = {
			form: formData,
			formReceiver: pet.createdBy,
			pet: param.id,
		};

		addAdoptionApi(data)
			.then((res) => {
				console.log(res);
				setPetStatusApi(param.id, { status: "pending" })
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
						return;
					});
				toast.success(res.data.message);
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.message);
				} else {
					toast.error("Something went wrong");
				}
			});
	};
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<div className="flex w-full max-w-4xl bg-white shadow-lg">
				{/* Left Image */}
				<div className=" hidden w-1/2 bg-[url('../public/assets/images/pet_adoption.png')] bg-cover bg-center md:block "></div>

				{/* Right Form */}
				<div className="w-full p-8 md:w-1/2">
					<h2 className="mb-4 text-2xl font-bold text-gray-800">
						Adoption Form
					</h2>

					<form className="space-y-4" onSubmit={handleSubmit}>
						<div className="flex space-x-4">
							<input
								type="text"
								placeholder="First Name"
								className="w-1/2 rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setFname(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Last Name"
								className="w-1/2 rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setLname(e.target.value)}
							/>
						</div>
						<div className="flex space-x-4">
							<input
								type="number"
								placeholder="Age"
								className="w-1/2 rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setAge(e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email"
								className="w-1/2 rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex space-x-4">
							<div className="w-1/2">
								<label className="block text-gray-700">Gender</label>
								<div className="flex space-x-4">
									<label className="flex items-center">
										<input
											type="radio"
											name="gender"
											value="m"
											className="form-radio"
											onChange={(e) => setGender(e.target.value)}
											defaultChecked={true}
										/>
										<span className="ml-2">Male</span>
									</label>
									<label className="flex items-center">
										<input
											type="radio"
											name="gender"
											value="fe"
											className="form-radio"
											onChange={(e) => setGender(e.target.value)}
										/>
										<span className="ml-2">Female</span>
									</label>
								</div>
							</div>
							<input
								type="tel"
								placeholder="Phone no"
								className="w-1/2 rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div className="flex space-x-4">
							<div className="w-1/2">
								<label className="block text-gray-700">
									Do you live in a house or apartment?
								</label>
								<select
									className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
									onChange={(e) => setHouseType(e.target.value)}
									defaultValue="House"
								>
									<option>House</option>
									<option>Apartment</option>
								</select>
							</div>
							<div className="w-1/2">
								<label className="block text-gray-700">
									Do you have a yard or outdoor space?
								</label>
								<select
									className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
									onChange={(e) => setYard(e.target.value)}
									defaultValue="Yard"
								>
									<option>Yard</option>
									<option>No Yard</option>
								</select>
							</div>
						</div>
						<div>
							<label className="block text-gray-700">
								Have you owned pets before? If yes, please describe your
								experience.
							</label>
							<textarea
								className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setPetExperience(e.target.value)}
							></textarea>
						</div>
						<div>
							<label className="block text-gray-700">
								Why do you want to adopt this particular pet?
							</label>
							<textarea
								className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
								onChange={(e) => setReason(e.target.value)}
							></textarea>
						</div>
						<p className="text-gray-700">
							You might need to wait for some time for confirmation?
						</p>
						<button
							type="submit"
							className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
						>
							Confirm
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdoptionForm;
