// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
// 	getUserByGoogleEmail,
// 	googleLoginApi,
// 	loginUserApi,
// } from "../../apis/Api";

// const Login = () => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [obscurePassword, setObscurePassword] = useState(true);

// 	const [emailError, setEmailError] = useState("");
// 	const [passwordError, setPasswordError] = useState("");
// 	const [roleError, setRoleError] = useState("");
// 	const [role, setRole] = useState("");
// 	const [showModal, setShowModal] = useState(false);
// 	const [googleToken, setGoogleToken] = useState("");
// 	const [googleId, setGoogleId] = useState("");

// 	const validate = () => {
// 		let isValid = true;
// 		if (email.trim() === "") {
// 			setEmailError("Email is required");
// 			isValid = false;
// 		}
// 		if (password.trim() === "") {
// 			setPasswordError("Password is required");
// 			isValid = false;
// 		}
// 		return isValid;
// 	};

// 	const resetErrors = () => {
// 		setEmailError("");
// 		setPasswordError("");
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		resetErrors();

// 		if (!validate()) {
// 			return;
// 		}

// 		const data = { email, password };

// 		loginUserApi(data)
// 			.then((res) => {
// 				if (res.status === 201) {
// 					toast.success(res.data.message);
// 					localStorage.setItem("token", res.data.token);
// 					localStorage.setItem("user", JSON.stringify(res.data.user));

// 					if (res.data.user.role === "owner") {
// 						window.location.href = "/admin/dashboard";
// 					} else {
// 						window.location.href = "/user/dashboard";
// 					}
// 				}
// 			})
// 			.catch((err) => {
// 				if (err.response) {
// 					if (err.response.status === 400) {
// 						toast.warning(err.response.data.message);
// 					} else if (err.response.status === 500) {
// 						toast.error(err.response.data.message);
// 					} else {
// 						toast.error("Something went wrong");
// 					}
// 				} else {
// 					toast.error("Something went wrong");
// 				}
// 			});
// 	};

// 	const handleGoogleLogin = () => {
// 		googleLoginApi({
// 			token: googleToken,
// 			googleId: googleId,
// 			role: role,
// 			password: password,
// 		})
// 			.then((response) => {
// 				if (response.status === 201) {
// 					// Handle success
// 					console.log("Token sent to backend successfully");
// 					// Redirect or handle further actions
// 					toast.success("Login Successful");
// 					localStorage.setItem("token", response.data.token);
// 					const user = response.data.user;
// 					localStorage.setItem("user", JSON.stringify(user));
// 					if (user.role === "adopter") {
// 						window.location.href = "/user/dashboard";
// 					} else if (user.role === "owner") {
// 						window.location.href = "/admin/dashboard";
// 					} else {
// 						window.location.href = "/";
// 					}
// 				} else {
// 					// Handle error
// 					console.error("Failed to send token to backend");
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error sending token to backend:", error);
// 			});
// 	};

// 	const openModal = () => {
// 		setShowModal(true);
// 	};

// 	return (
// 		<>
// 			{/* Modal */}
// 			{showModal && (
// 				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
// 					<div className="rounded-lg bg-white p-8">
// 						<h2 className="mb-4 text-2xl font-bold">
// 							Please enter password and role as you are login for the first time
// 						</h2>
// 						<div>
// 							{/* Password field */}
// 							<div>
// 								<label
// 									htmlFor="password"
// 									className="block text-sm font-medium text-gray-700"
// 								>
// 									{" "}
// 									Password
// 								</label>
// 								<div className="relative mt-1  rounded-md shadow-sm">
// 									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// 										<i className="bi bi-lock text-gray-400"></i>
// 									</div>
// 									<input
// 										id="password"
// 										name="password"
// 										type={obscurePassword ? "password" : "text"}
// 										autoComplete="current-password"
// 										required
// 										className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-10 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
// 										placeholder="********"
// 										onChange={(e) => setPassword(e.target.value)}
// 									/>
// 									<div
// 										className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
// 										onClick={() => setObscurePassword(!obscurePassword)}
// 									>
// 										<i
// 											className={
// 												obscurePassword
// 													? "bi bi-eye-slash text-gray-400"
// 													: "bi bi-eye text-gray-400"
// 											}
// 										></i>
// 									</div>
// 								</div>
// 								{passwordError && (
// 									<p className="mt-2 text-sm text-red-600">{passwordError}</p>
// 								)}
// 							</div>
// 							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
// 								<div>
// 									<input
// 										type="radio"
// 										id="adopter"
// 										name="role"
// 										value="adopter"
// 										onChange={() => {
// 											setRole("adopter");
// 										}}
// 									/>
// 									<label htmlFor="adopter">Pet Adopter</label>
// 								</div>
// 								<div>
// 									<input
// 										type="radio"
// 										id="owner"
// 										name="role"
// 										value="owner"
// 										onChange={() => setRole("owner")}
// 									/>
// 									<label htmlFor="owner">Pet Owner</label>
// 								</div>
// 								<div>
// 									<input
// 										type="radio"
// 										id="shelter"
// 										name="role"
// 										value="shelter"
// 										onChange={() => setRole("owner")}
// 									/>
// 									<label htmlFor="shelter">Pet Shelter</label>
// 								</div>
// 								{roleError && (
// 									<p className="text-sm text-red-500">{roleError}</p>
// 								)}
// 							</div>
// 						</div>
// 						<div className="mt-4 text-right">
// 							<button
// 								type="button"
// 								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
// 								onClick={() => setShowModal(false)}
// 							>
// 								Cancel
// 							</button>
// 							<button
// 								type="button"
// 								className="ml-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
// 								onClick={handleGoogleLogin}
// 							>
// 								Submit
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			<div className="flex min-h-screen items-center justify-center bg-gray-200 ">
// 				<div className="my-10 w-full max-w-5xl px-6 ">
// 					<div className="flex flex-col bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
// 						<div className="sm:mx-auto sm:w-full sm:max-w-md">
// 							<h2 className="text-center text-3xl font-extrabold text-gray-900">
// 								Pet Connect
// 							</h2>
// 						</div>
// 						<form>
// 							<>
// 								<div className="mx-auto mt-10   space-y-6">
// 									<div>
// 										<label
// 											htmlFor="email"
// 											className="block text-sm font-medium text-gray-700"
// 										>
// 											Email
// 										</label>
// 										<div className="relative mt-1 rounded-md shadow-sm">
// 											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// 												<i className="bi bi-envelope text-gray-400"></i>
// 											</div>
// 											<input
// 												id="email"
// 												name="email"
// 												type="email"
// 												autoComplete="email"
// 												required
// 												className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
// 												placeholder="you@example.com"
// 												onChange={(e) => setEmail(e.target.value)}
// 											/>
// 										</div>
// 										{emailError && (
// 											<p className="mt-2 text-sm text-red-600">{emailError}</p>
// 										)}
// 									</div>
// 									<div>
// 										<label
// 											htmlFor="password"
// 											className="block text-sm font-medium text-gray-700"
// 										>
// 											Password
// 										</label>
// 										<div className="relative mt-1  rounded-md shadow-sm">
// 											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// 												<i className="bi bi-lock text-gray-400"></i>
// 											</div>
// 											<input
// 												id="password"
// 												name="password"
// 												type={obscurePassword ? "password" : "text"}
// 												autoComplete="current-password"
// 												required
// 												className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-10 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
// 												placeholder="********"
// 												onChange={(e) => setPassword(e.target.value)}
// 											/>
// 											<div
// 												className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
// 												onClick={() => setObscurePassword(!obscurePassword)}
// 											>
// 												<i
// 													className={
// 														obscurePassword
// 															? "bi bi-eye-slash text-gray-400"
// 															: "bi bi-eye text-gray-400"
// 													}
// 												></i>
// 											</div>
// 										</div>
// 										{passwordError && (
// 											<p className="mt-2 text-sm text-red-600">
// 												{passwordError}
// 											</p>
// 										)}
// 									</div>
// 									<div className="flex items-center justify-end">
// 										<div className="text-sm">
// 											<a
// 												href="/forgot"
// 												className="font-medium text-blue-600 hover:text-blue-500"
// 											>
// 												Forgot your password?
// 											</a>
// 										</div>
// 									</div>
// 									<div>
// 										<button
// 											type="submit"
// 											onClick={handleSubmit}
// 											className="mx-auto flex w-full max-w-96  justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// 										>
// 											Log in
// 										</button>
// 									</div>
// 								</div>
// 							</>
// 						</form>
// 						{/* Sign Up Section */}
// 						<div className="mt-4 text-center">
// 							<p className="text-sm">
// 								Don't have an account?{" "}
// 								<Link
// 									to="/register"
// 									className="font-medium text-blue-600 hover:text-blue-500"
// 								>
// 									Sign Up
// 								</Link>
// 							</p>
// 						</div>
// 						{/* Social Login Section */}
// 						<div className="mt-6">
// 							<div className="relative">
// 								<div className="absolute inset-0 flex items-center">
// 									<div className="w-full border-t border-gray-300"></div>
// 								</div>
// 								<div className="relative flex justify-center text-sm">
// 									<span className="bg-white px-2 text-gray-500">
// 										Or continue with
// 									</span>
// 								</div>
// 							</div>
// 							<div className="mt-6 flex ">
// 								<GoogleLogin
// 									className="sign"
// 									onSuccess={(credentialResponse) => {
// 										const token = credentialResponse.credential; // This is the token received from Google
// 										const details = jwtDecode(token); // Decode the token if needed
// 										// Assuming you have an API function to send data to your backend
// 										setGoogleId(details.sub);
// 										setGoogleToken(token);

// 										console.log(token);
// 										console.log(googleToken);

// 										const data = {
// 											token: token,
// 										};

// 										console.log(data);

// 										getUserByGoogleEmail(data)
// 											.then((response) => {
// 												if (response.status === 200) {
// 													console.log("User exists");
// 													// User exists, login
// 													handleGoogleLogin({ token: token });
// 												}
// 											})
// 											.catch((error) => {
// 												if (error.response) {
// 													if (error.response.status === 400) {
// 														// User does not exist, show modal
// 														openModal();
// 													} else {
// 														toast(error.response.data.message);
// 													}
// 												} else {
// 													toast("Error: Something went wrong");
// 												}
// 											});
// 									}}
// 									onError={() => {
// 										console.log("Login Failed");
// 									}}
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Login;

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	getUserByGoogleEmail,
	googleLoginApi,
	loginUserApi,
} from "../../apis/Api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [obscurePassword, setObscurePassword] = useState(true);
	const [errors, setErrors] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [googleToken, setGoogleToken] = useState("");
	const [googleId, setGoogleId] = useState("");
	const [role, setRole] = useState("");

	const validate = () => {
		const newErrors = {};
		if (!email.trim()) newErrors.email = "Email is required";
		if (!password.trim()) newErrors.password = "Password is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validate()) return;

		loginUserApi({ email, password })
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message);
					localStorage.setItem("token", res.data.token);
					localStorage.setItem("user", JSON.stringify(res.data.user));
					window.location.href =
						res.data.user.role === "owner"
							? "/admin/dashboard"
							: "/user/dashboard";
				}
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 400)
						toast.warning(err.response.data.message);
					else if (err.response.status === 500)
						toast.error(err.response.data.message);
					else toast.error("Something went wrong");
				} else {
					toast.error("Something went wrong");
				}
			});
	};

	const handleGoogleLogin = () => {
		googleLoginApi({ token: googleToken, googleId, role, password })
			.then((response) => {
				if (response.status === 201) {
					toast.success("Login Successful");
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("user", JSON.stringify(response.data.user));
					window.location.href =
						response.data.user.role === "owner"
							? "/admin/dashboard"
							: "/user/dashboard";
				} else {
					console.error("Failed to send token to backend");
				}
			})
			.catch((error) =>
				console.error("Error sending token to backend:", error),
			);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
			<div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
				{/* Left Side - Image */}
				<div className="hidden flex-col justify-between bg-indigo-600 p-12 md:flex md:w-1/2">
					<div>
						<h2 className="mb-6 text-4xl font-bold text-white">
							Welcome Back!
						</h2>
						<p className="mb-6 text-indigo-200">
							Connect with your furry friends and manage your pet adoptions with
							ease.
						</p>
					</div>
					<img
						src="/path-to-your-pet-image.svg"
						alt="Pet illustration"
						className="mx-auto max-w-xs"
					/>
				</div>

				{/* Right Side - Login Form */}
				<div className="p-12 md:w-1/2">
					<h2 className="mb-8 text-3xl font-bold text-gray-800">
						Login to Pet Connect
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="mb-1 block text-sm font-medium text-gray-700"
							>
								Email Address
							</label>
							<input
								id="email"
								type="email"
								className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
								placeholder="you@example.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-500">{errors.email}</p>
							)}
						</div>
						<div>
							<label
								htmlFor="password"
								className="mb-1 block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={obscurePassword ? "password" : "text"}
									className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
									placeholder="Enter your password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 flex items-center pr-3"
									onClick={() => setObscurePassword(!obscurePassword)}
								>
									<i
										className={`bi ${obscurePassword ? "bi-eye-slash" : "bi-eye"} text-gray-500`}
									></i>
								</button>
							</div>
							{errors.password && (
								<p className="mt-1 text-sm text-red-500">{errors.password}</p>
							)}
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-700"
								>
									Remember me
								</label>
							</div>
							<a
								href="/forgot"
								className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								Forgot password?
							</a>
						</div>
						<button
							type="submit"
							className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Log in
						</button>
					</form>
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>
						<div className="mt-6">
							<GoogleLogin
								className="w-full"
								onSuccess={(credentialResponse) => {
									const token = credentialResponse.credential;
									const details = jwtDecode(token);
									setGoogleId(details.sub);
									setGoogleToken(token);

									getUserByGoogleEmail({ token })
										.then((response) => {
											if (response.status === 200) {
												handleGoogleLogin({ token });
											}
										})
										.catch((error) => {
											if (error.response && error.response.status === 400) {
												setShowModal(true);
											} else {
												toast.error("Error: Something went wrong");
											}
										});
								}}
								onError={() => {
									console.log("Login Failed");
								}}
							/>
						</div>
					</div>
					<p className="mt-8 text-center text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>

			{/* Modal for first-time Google login */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
					<div className="w-full max-w-md rounded-lg bg-white p-8">
						<h2 className="mb-4 text-2xl font-bold">
							Complete Your Registration
						</h2>
						<p className="mb-4">
							Please set a password and choose your role to complete your
							registration.
						</p>
						<input
							type="password"
							placeholder="Set a password"
							className="mb-4 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="mb-4">
							<label className="mb-2 block">Choose your role:</label>
							<div className="space-y-2">
								{["adopter", "owner", "shelter"].map((r) => (
									<label key={r} className="flex items-center">
										<input
											type="radio"
											name="role"
											value={r}
											onChange={() => setRole(r)}
											className="mr-2"
										/>
										{r.charAt(0).toUpperCase() + r.slice(1)}
									</label>
								))}
							</div>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => setShowModal(false)}
								className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
							>
								Cancel
							</button>
							<button
								onClick={handleGoogleLogin}
								className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
							>
								Complete Registration
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
