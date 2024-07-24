import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const transactionId = queryParams.get("transaction_id");

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
				<div className="mb-6 text-center text-green-500">
					<FaCheckCircle className="mx-auto text-6xl" />
				</div>
				<h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
					Payment Successful!
				</h1>
				<p className="mb-6 text-center text-gray-600">
					Thank you for your adoption payment. Your transaction was successful.
				</p>
				{transactionId && (
					<p className="mb-6 text-center text-sm text-gray-500">
						Transaction ID: {transactionId}
					</p>
				)}
				<div className="flex justify-center">
					<Link
						to="/user/dashboard "
						className="rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
					>
						Go to Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
