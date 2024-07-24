import React, { useState } from "react";
import {
	FaCashRegister,
	FaMobileAlt,
	FaUniversity,
	FaWallet,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { createPaymentApi, initiateKhaltiPayment } from "../../apis/Api";

const AdoptionPayment = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [amount, setAmount] = useState(1000);
	const [paymentMethod, setPaymentMethod] = useState("cash");
	const [khaltiPaymentMethod, setKhaltiPaymentMethod] = useState("wallet");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleAmountChange = (e) => {
		setAmount(parseInt(e.target.value));
	};

	const handlePaymentMethodChange = (method) => {
		setPaymentMethod(method);
	};

	const handleKhaltiPaymentMethodChange = (method) => {
		setKhaltiPaymentMethod(method);
	};

	const handleKhaltiPayment = async (payment) => {
		try {
			const data = {
				return_url: "http://localhost:3000/payment-success",
				website_url: "http://localhost:3000",
				amount: payment.paymentAmount * 100,
				purchase_order_id: payment._id,
				purchase_order_name: "Pet Adoption",
				customer_info: {
					name: payment.user.firstName,
					email: payment.user.email,
					phone: payment.user.phone,
				},
				amount_breakdown: [
					{
						label: "Adoption Fee",
						amount: payment.paymentAmount * 100,
					},
				],
				product_details: [
					{
						identity: payment.pet._id,
						name: payment.pet.petName,
						total_price: payment.paymentAmount * 100,
						quantity: 1,
						unit_price: payment.paymentAmount * 100,
					},
				],
				merchant_extra: {
					petId: payment.pet._id,
					petName: payment.pet.name,
					adoptionDate: new Date().toISOString(),
				},
			};

			const res = await initiateKhaltiPayment(data);
			window.location.href = res.data.payment_url;
		} catch (err) {
			setError(err.response?.data?.message || err.message);
			navigate(
				`/payment-failure/${params.petId}?error=${encodeURIComponent(err.message)}`,
			);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const data = {
				paymentAmount: amount,
				paymentMethod: paymentMethod,
				pet: params.petId,
			};

			const res = await createPaymentApi(data);

			if (paymentMethod === "khalti") {
				await handleKhaltiPayment(res.data.payment);
			} else {
				navigate("/payment-success");
			}
		} catch (err) {
			setError(err.response?.data?.message || err.message);
			navigate(
				`/payment-failure/${params.petId}?error=${encodeURIComponent(err.message)}`,
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-8 shadow-xl">
			<h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
				Adoption Payment
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="amount"
					>
						Donation Amount (Rs.)
					</label>
					<input
						className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="amount"
						type="number"
						value={amount}
						onChange={handleAmountChange}
						min="10"
						max="1000"
					/>
				</div>
				<div className="mb-6">
					<label className="mb-2 block text-sm font-bold text-gray-700">
						Payment Method
					</label>
					<div className="flex flex-wrap space-x-4">
						<button
							type="button"
							className={`mb-2 flex items-center justify-center rounded-lg px-4 py-2 ${
								paymentMethod === "cash"
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
							onClick={() => handlePaymentMethodChange("cash")}
						>
							<FaCashRegister className="mr-2" />
							Cash on visit
						</button>
						<button
							type="button"
							className={`mb-2 flex items-center justify-center rounded-lg px-4 py-2 ${
								paymentMethod === "khalti"
									? "bg-purple-500 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
							onClick={() => handlePaymentMethodChange("khalti")}
						>
							<FaWallet className="mr-2" />
							Khalti
						</button>
					</div>
				</div>
				{paymentMethod === "khalti" && (
					<div className="mb-6">
						<label className="mb-2 block text-sm font-bold text-gray-700">
							Khalti Payment Method
						</label>
						<div className="flex flex-wrap space-x-4">
							<button
								type="button"
								className={`mb-2 flex items-center justify-center rounded-lg px-4 py-2 ${
									khaltiPaymentMethod === "wallet"
										? "bg-purple-500 text-white"
										: "bg-gray-200 text-gray-700"
								}`}
								onClick={() => handleKhaltiPaymentMethodChange("wallet")}
							>
								<FaWallet className="mr-2" />
								Wallet
							</button>
							<button
								type="button"
								className={`mb-2 flex items-center justify-center rounded-lg px-4 py-2 ${
									khaltiPaymentMethod === "ebanking"
										? "bg-purple-500 text-white"
										: "bg-gray-200 text-gray-700"
								}`}
								onClick={() => handleKhaltiPaymentMethodChange("ebanking")}
							>
								<FaUniversity className="mr-2" />
								eBanking
							</button>
							<button
								type="button"
								className={`mb-2 flex items-center justify-center rounded-lg px-4 py-2 ${
									khaltiPaymentMethod === "mobile_banking"
										? "bg-purple-500 text-white"
										: "bg-gray-200 text-gray-700"
								}`}
								onClick={() =>
									handleKhaltiPaymentMethodChange("mobile_banking")
								}
							>
								<FaMobileAlt className="mr-2" />
								Mobile Banking
							</button>
						</div>
					</div>
				)}
				{error && <p className="mb-4 text-red-500">{error}</p>}
				<div className="flex items-center justify-between">
					<button
						className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Processing..." : "Process Payment"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdoptionPayment;
