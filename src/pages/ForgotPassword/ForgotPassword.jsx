/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	forgotPasswordByEmailApi,
	forgotPasswordByPhoneApi,
	resetPasswordApi,
} from "../../apis/Api";

const ForgotPassword = () => {
	const [option, setOption] = useState("email");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [sentOtp, setSentOtp] = useState(false);
	const [sentEmail, setSentEmail] = useState(false);
	const [timer, setTimer] = useState(0);

	const handleOptionChange = (e) => {
		if (timer === 0) {
			setOption(e.target.value);
			setSentOtp(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (option === "email") {
			const data = { email };

			// Call API to send email
			forgotPasswordByEmailApi(data)
				.then((res) => {
					toast.success(res.data.message);
					setSentEmail(true);
					startTimer();
				})
				.catch((err) => {
					if (err.response) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Something went wrong");
					}
				});
		} else {
			if (!sentOtp) {
				const data = { phone };

				// Call API to send OTP
				forgotPasswordByPhoneApi(data)
					.then((res) => {
						toast.success(res.data.message);
						setSentOtp(true);
						startTimer();
					})
					.catch((err) => {
						if (err.response) {
							toast.error(err.response.data.message);
						} else {
							toast.error("Something went wrong");
						}
					});
			} else {
				// Verify OTP and reset password
				const data = { phone, otp, password, confirmPassword };
				resetPasswordApi(data)
					.then((res) => {
						toast.success(res.data.message);
						window.location.href = "/login";
					})
					.catch((err) => {
						if (err.response) {
							toast.error(err.response.data.message);
						} else {
							toast.error("Something went wrong");
						}
					});
			}
		}
	};

	const startTimer = () => {
		setTimer(60);
	};

	useEffect(() => {
		if (timer > 0) {
			const countdown = setTimeout(() => setTimer(timer - 1), 1000);
			return () => clearTimeout(countdown);
		}
	}, [timer]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
			>
				<h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
					Forgot Password
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label className="mb-2 block font-semibold text-gray-700">
							Select Option:
						</label>
						<div className="flex justify-center space-x-4">
							<motion.label
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`inline-flex cursor-pointer items-center rounded-lg p-2 ${
									option === "email" ? "bg-blue-100" : "bg-gray-100"
								}`}
							>
								<input
									type="radio"
									name="option"
									value="email"
									checked={option === "email"}
									onChange={handleOptionChange}
									className="form-radio text-blue-500"
									disabled={timer > 0}
								/>
								<span className="ml-2">Email</span>
							</motion.label>
							<motion.label
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`inline-flex cursor-pointer items-center rounded-lg p-2 ${
									option === "phone" ? "bg-blue-100" : "bg-gray-100"
								}`}
							>
								<input
									type="radio"
									name="option"
									value="phone"
									checked={option === "phone"}
									onChange={handleOptionChange}
									className="form-radio text-blue-500"
									disabled={timer > 0}
								/>
								<span className="ml-2">Phone</span>
							</motion.label>
						</div>
					</div>

					{option === "email" ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="mb-6"
						>
							<label className="mb-2 block font-semibold text-gray-700">
								Email:
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition duration-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
								placeholder="Enter your email"
								required
							/>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<div className="mb-6">
								<label className="mb-2 block font-semibold text-gray-700">
									Phone:
								</label>
								<input
									type="text"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition duration-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
									placeholder="Enter your phone number"
									required
								/>
							</div>
							{sentOtp && (
								<>
									<div className="mb-6">
										<label className="mb-2 block font-semibold text-gray-700">
											OTP:
										</label>
										<input
											type="text"
											value={otp}
											onChange={(e) => setOtp(e.target.value)}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition duration-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
											placeholder="Enter the OTP"
											required
										/>
									</div>
									<div className="mb-6">
										<label className="mb-2 block font-semibold text-gray-700">
											New Password:
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition duration-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
											placeholder="Enter your new password"
											required
										/>
									</div>
									<div className="mb-6">
										<label className="mb-2 block font-semibold text-gray-700">
											Confirm Password:
										</label>
										<input
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm transition duration-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
											placeholder="Confirm your new password"
											required
										/>
									</div>
								</>
							)}
						</motion.div>
					)}

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit"
						className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						{option === "email"
							? "Send Email"
							: sentOtp
								? "Verify OTP and Reset Password"
								: "Send OTP"}
					</motion.button>

					{timer > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="mt-4 text-center text-gray-700"
						>
							Please wait {timer} seconds before trying again.
						</motion.div>
					)}
				</form>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;
