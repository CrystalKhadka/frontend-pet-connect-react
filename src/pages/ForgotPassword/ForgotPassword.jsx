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
			setSentOtp(false); // Reset OTP state if option changes
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
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-96 rounded bg-white p-8 shadow-md">
				<h2 className="mb-6 text-center text-2xl font-bold">Forgot Password</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Select Option:</label>
						<div className="mt-2">
							<label className="inline-flex items-center">
								<input
									type="radio"
									name="option"
									value="email"
									checked={option === "email"}
									onChange={handleOptionChange}
									className="form-radio"
									disabled={timer > 0}
								/>
								<span className="ml-2">Email</span>
							</label>
							<label className="ml-6 inline-flex items-center">
								<input
									type="radio"
									name="option"
									value="phone"
									checked={option === "phone"}
									onChange={handleOptionChange}
									className="form-radio"
									disabled={timer > 0}
								/>
								<span className="ml-2">Phone</span>
							</label>
						</div>
					</div>

					{option === "email" ? (
						<div className="mb-4">
							<label className="block text-gray-700">Email:</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-2 block w-full rounded border p-2"
								placeholder="Enter your email"
								required
							/>
						</div>
					) : (
						<>
							<div className="mb-4">
								<label className="block text-gray-700">Phone:</label>
								<input
									type="text"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="mt-2 block w-full rounded border p-2"
									placeholder="Enter your phone number"
									required
								/>
							</div>
							{sentOtp && (
								<>
									<div className="mb-4">
										<label className="block text-gray-700">OTP:</label>
										<input
											type="text"
											value={otp}
											onChange={(e) => setOtp(e.target.value)}
											className="mt-2 block w-full rounded border p-2"
											placeholder="Enter the OTP"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700">New Password:</label>
										<input
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="mt-2 block w-full rounded border p-2"
											placeholder="Enter your new password"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700">
											Confirm Password:
										</label>
										<input
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="mt-2 block w-full rounded border p-2"
											placeholder="Confirm your new password"
											required
										/>
									</div>
								</>
							)}
						</>
					)}

					<button
						type="submit"
						className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
					>
						{option === "email"
							? "Send Email"
							: sentOtp
								? "Verify OTP and Reset Password"
								: "Send OTP"}
					</button>

					{timer > 0 && (
						<div className="mt-4 text-center text-gray-700">
							Please wait {timer} seconds before trying again.
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
