import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	getCurrentUserApi,
	profileImageUrl,
	updateUserProfileApi,
	uploadImageApi,
} from "../../apis/Api";

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [imageName, setImageName] = useState("");
	const [userProfile, setUserProfile] = useState({
		firstName: "",
		lastName: "",
		email: "",
		birthDate: "",
		phone: "",
		address: "",
		gender: "",
		role: "",
		image: imageName,
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const fetchUserProfile = async () => {
		try {
			const response = await getCurrentUserApi();
			if (response.status === 200) {
				setUserProfile(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching user profile:", error);
			toast.error("Failed to load user profile");
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserProfile((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		let isValid = true;
		let newErrors = {};

		if (userProfile.firstName.trim() === "") {
			newErrors.firstName = "First name is required";
			isValid = false;
		}
		if (userProfile.lastName.trim() === "") {
			newErrors.lastName = "Last name is required";
			isValid = false;
		}
		if (userProfile.phone === "") {
			newErrors.phone = "Phone number is required";
			isValid = false;
		}
		if (userProfile.address.trim() === "") {
			newErrors.address = "Address is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			const response = await updateUserProfileApi(userProfile);
			if (response.status === 200) {
				toast.success("Profile updated successfully");
				setIsEditing(false);
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Failed to update profile");
		}
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await uploadImageApi(formData);
			if (response.status === 200) {
				setImageName(response.data.image);
				setUserProfile((prev) => ({ ...prev, image: response.data.image }));
				toast.success("Profile picture updated successfully");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			toast.error("Failed to upload image");
		}
	};

	const InputField = ({
		label,
		name,
		type,
		value,
		onChange,
		error,
		disabled = false,
	}) => (
		<div className="mb-4 sm:col-span-1">
			<label
				htmlFor={name}
				className="mb-1 block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled || !isEditing}
				className={`w-full rounded-md border px-3 py-2 ${
					error ? "border-red-500" : "border-gray-300"
				} ${disabled ? "bg-gray-100" : ""} focus:outline-none focus:ring-1 focus:ring-blue-500`}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-md">
				<div className="px-4 py-5 sm:p-6">
					<h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
						{isEditing ? "Edit Profile" : "User Profile"}
					</h2>

					<div className="mb-8 text-center">
						<div className="relative mb-4 inline-block">
							{userProfile.image ? (
								<img
									src={
										`${profileImageUrl}/${userProfile.image}` ?? "/profile.png"
									}
									alt="Profile"
									className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover"
								/>
							) : (
								<div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-blue-500 bg-gray-300">
									<span className="text-xl text-gray-500">No Image</span>
								</div>
							)}
							{isEditing && (
								<label
									htmlFor="profile-image"
									className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 transition-colors hover:bg-blue-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</label>
							)}
						</div>
						<input
							id="profile-image"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
						/>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<InputField
								label="First Name"
								name="firstName"
								type="text"
								value={userProfile.firstName}
								onChange={handleInputChange}
								error={errors.firstName}
							/>
							<InputField
								label="Last Name"
								name="lastName"
								type="text"
								value={userProfile.lastName}
								onChange={handleInputChange}
								error={errors.lastName}
							/>
							<InputField
								label="Email"
								name="email"
								type="email"
								value={userProfile.email}
								onChange={handleInputChange}
								error={errors.email}
								disabled={true}
							/>
							<InputField
								label="Birth Date"
								name="birthDate"
								type="date"
								value={userProfile.birthDate}
								onChange={handleInputChange}
								error={errors.birthDate}
							/>
							<InputField
								label="Phone"
								name="phone"
								type="tel"
								value={userProfile.phone}
								onChange={handleInputChange}
								error={errors.phone}
							/>
							<InputField
								label="Address"
								name="address"
								type="text"
								value={userProfile.address}
								onChange={handleInputChange}
								error={errors.address}
							/>
						</div>

						<div className="sm:col-span-2">
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Gender
							</label>
							<div className="flex space-x-4">
								{["Male", "Female", "Other"].map((option) => (
									<label key={option} className="flex items-center">
										<input
											type="radio"
											name="gender"
											value={option.toLowerCase()}
											checked={userProfile.gender === option.toLowerCase()}
											onChange={handleInputChange}
											disabled={!isEditing}
											className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
										/>
										<span className="ml-2 text-sm text-gray-700">{option}</span>
									</label>
								))}
							</div>
						</div>

						<InputField
							label="Role"
							name="role"
							type="text"
							value={userProfile.role}
							disabled={true}
						/>

						<div className="flex justify-end space-x-3">
							{!isEditing ? (
								<button
									type="button"
									onClick={() => setIsEditing(true)}
									className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								>
									Edit Profile
								</button>
							) : (
								<>
									<button
										type="button"
										onClick={() => {
											setIsEditing(false);
											fetchUserProfile();
										}}
										className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
									>
										Save Changes
									</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
