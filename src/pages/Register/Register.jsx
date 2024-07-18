import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [obscurePassword, setObscurePassword] = useState(false);
	const [role, setRole] = useState("adopter");
	const [showModal, setShowModal] = useState(false);

	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [birthDateError, setBirthDateError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [addressError, setAddressError] = useState("");
	const [genderError, setGenderError] = useState("");
	const [roleError, setRoleError] = useState("");

	const handleGenderChange = (e) => {
		setGender(e.target.value);
	};

	const setDefaultError = () => {
		setFirstNameError("");
		setLastNameError("");
		setEmailError("");
		setPasswordError("");
		setConfirmPasswordError("");
		setBirthDateError("");
		setPhoneError("");
		setAddressError("");
		setGenderError("");
		setRoleError("");
	};

	var validate = () => {
		var isValid = true;

		if (firstName.trim() === "") {
			setFirstNameError("First name is required");
			isValid = false;
		}
		if (lastName.trim() === "") {
			setLastNameError("Last name is required");
			isValid = false;
		}
		if (email.trim() === "") {
			setEmailError("Email is required");
			isValid = false;
		}
		if (password.trim() === "") {
			setPasswordError("Password is required");
			isValid = false;
		}
		if (confirmPassword.trim() === "") {
			setConfirmPasswordError("Confirm Password is required");
			isValid = false;
		}
		if (birthDate.trim() === "") {
			setBirthDateError("Birth Date is required");
			isValid = false;
		}
		if (phone.trim() === "") {
			setPhoneError("Phone is required");
			isValid = false;
		}
		if (address.trim() === "") {
			setAddressError("Address is required");
			isValid = false;
		}
		if (gender.trim() === "") {
			setGenderError("Gender is required");
			isValid = false;
		}
		if (password.trim().length < 8) {
			setPasswordError("Password must be at least 8 characters long");
			isValid = false;
		}

		if (email.includes("@") === false || email.includes(".") === false) {
			setEmailError("Invalid Email");
			isValid = false;
		}
		return isValid;
	};

	const checkBirthDate = () => {
		var today = new Date();
		var date = new Date(birthDate);

		var age = today.getFullYear() - date.getFullYear();
		var m = today.getMonth() - date.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
			age--;
		}
		if (age < 18) {
			setBirthDateError("You must be 18 years or older");
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setDefaultError();

		if (!validate() || !checkBirthDate()) {
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Password and Confirm Password doesn't match");
			return;
		}

		setShowModal(true);
	};

	const handleRoleSelect = (selectedRole) => {
		setRole(selectedRole);
	};

	const handleRegister = () => {
		if (role.trim() === "") {
			setRoleError("Role selection is required");
			return;
		}

		setShowModal(false);
		const data = {
			firstName,
			lastName,
			email,
			password,
			birthDate,
			phone,
			address,
			gender,
			role,
		};

		registerUserApi(data)
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					if (err.response.status === 400) {
						toast.warning(err.response.data.message);
					} else if (err.response.status === 500) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Something went wrong");
					}
				} else {
					toast.error("Something went wrong");
				}
			});
	};

	return (
		<>
			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
					<div className="rounded-lg bg-white p-8">
						<h2 className="mb-4 text-2xl font-bold">Select Your Role</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div>
								<input
									type="radio"
									id="adopter"
									name="role"
									value="adopter"
									onChange={() => handleRoleSelect("adopter")}
								/>
								<label htmlFor="adopter">Pet Adopter</label>
							</div>
							<div>
								<input
									type="radio"
									id="owner"
									name="role"
									value="owner"
									onChange={() => handleRoleSelect("owner")}
								/>
								<label htmlFor="owner">Pet Owner</label>
							</div>
							<div>
								<input
									type="radio"
									id="shelter"
									name="role"
									value="shelter"
									onChange={() => handleRoleSelect("shelter")}
								/>
								<label htmlFor="shelter">Pet Shelter</label>
							</div>
							{roleError && <p className="text-sm text-red-500">{roleError}</p>}
						</div>
						<div className="mt-4 text-right">
							<button
								type="button"
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="ml-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
								onClick={() => handleRegister()}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
					<div className="flex flex-col md:flex-row">
						{/* Left Side - Image and Welcome Message */}
						<div className="md:w-1/2 bg-indigo-600 p-12 hidden md:flex flex-col justify-between">
							<div>
								<h2 className="text-white text-4xl font-bold mb-6">Join Our Community!</h2>
								<p className="text-indigo-200 mb-6">Create an account to start your journey with us.</p>
							</div>
							<img src="/path-to-your-illustration.svg" alt="Registration illustration" className="max-w-xs mx-auto" />
						</div>

						{/* Right Side - Registration Form */}
						<div className="md:w-1/2 p-12">
							<h2 className="text-3xl font-bold text-gray-800 mb-8">Create Your Account</h2>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<InputField
										label="First Name"
										id="firstName"
										name="firstName"
										type="text"
										icon="bi-person"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										error={firstNameError}
									/>
									<InputField
										label="Last Name"
										id="lastName"
										name="lastName"
										type="text"
										icon="bi-person"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										error={lastNameError}
									/>
								</div>
								<InputField
									label="Email"
									id="email"
									name="email"
									type="email"
									icon="bi-envelope"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									error={emailError}
								/>
								<InputField
									label="Password"
									id="password"
									name="password"
									type={obscurePassword ? "password" : "text"}
									icon="bi-lock"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									error={passwordError}
									rightIcon={
										<i
											className={`bi ${obscurePassword ? "bi-eye-slash" : "bi-eye"} text-gray-400 cursor-pointer`}
											onClick={() => setObscurePassword(!obscurePassword)}
										></i>
									}
								/>
								<InputField
									label="Confirm Password"
									id="confirmPassword"
									name="confirmPassword"
									type={obscurePassword ? "password" : "text"}
									icon="bi-lock"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									error={confirmPasswordError}
									rightIcon={
										<i
											className={`bi ${obscurePassword ? "bi-eye-slash" : "bi-eye"} text-gray-400 cursor-pointer`}
											onClick={() => setObscurePassword(!obscurePassword)}
										></i>
									}
								/>
								<InputField
									label="Birth Date"
									id="birthDate"
									name="birthDate"
									type="date"
									icon="bi-calendar"
									value={birthDate}
									onChange={(e) => setBirthDate(e.target.value)}
									error={birthDateError}
								/>
								<InputField
									label="Phone"
									id="phone"
									name="phone"
									type="tel"
									icon="bi-phone"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									error={phoneError}
								/>
								<InputField
									label="Address"
									id="address"
									name="address"
									type="text"
									icon="bi-pin"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									error={addressError}
								/>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
									<div className="flex space-x-4">
										{['Male', 'Female', 'Other'].map((option) => (
											<label key={option} className="flex items-center">
												<input
													type="radio"
													name="gender"
													value={option.toLowerCase()}
													checked={gender === option.toLowerCase()}
													onChange={handleGenderChange}
													className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
												/>
												<span className="ml-2 text-sm text-gray-700">{option}</span>
											</label>
										))}
									</div>
									{genderError && <p className="mt-1 text-sm text-red-600">{genderError}</p>}
								</div>
								<div className="flex items-center">
									<input
										id="acceptTerms"
										name="acceptTerms"
										type="checkbox"
										required
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
										I accept the <a href="/" className="text-indigo-600 hover:text-indigo-500">Terms of Use</a> & <a href="/" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
									</label>
								</div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
								>
									Register Now
								</button>
							</form>
							<p className="mt-8 text-center text-sm text-gray-600">
								Already have an account?{' '}
								<Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
									Log in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


const InputField = ({ label, id, name, type, icon, value, onChange, error, rightIcon }) => (
	<div>
	  <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
		{label}
	  </label>
	  <div className="relative rounded-md shadow-sm">
		<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
		  <i className={`bi ${icon} text-gray-400`}></i>
		</div>
		<input
		  type={type}
		  id={id}
		  name={name}
		  value={value}
		  onChange={onChange}
		  className={`block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-300' : ''}`}
		  placeholder={label}
		/>
		{rightIcon && (
		  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
			{rightIcon}
		  </div>
		)}
	  </div>
	  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
	</div>
  )
  

	
export default Register;
