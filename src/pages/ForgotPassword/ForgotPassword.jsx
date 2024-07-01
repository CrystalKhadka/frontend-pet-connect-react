import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordByEmailApi } from "../../apis/Api";

const ForgotPassword = () => {
	const [option, setOption] = useState("email");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const handleOptionChange = (e) => {
		setOption(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (option === "email") {
			const data = { email };

			// Call API to send email
			forgotPasswordByEmailApi(data)
				.then((res) => {
					toast.success(res.data.message);
				})
				.catch((err) => {
					if (err.response) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Something went wrong");
					}
				});
		} else {
			// Send OTP to phone logic here
			toast.success("OTP sent successfully");
		}
	};

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
					)}

					<button
						type="submit"
						className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
					>
						{option === "email" ? "Send Email" : "Send OTP"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
