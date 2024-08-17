import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";

const PaymentFailure = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const errorMessage = queryParams.get("error") || "An unknown error occurred";
	const params = useParams();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
				<div className="mb-6 text-center text-red-500">
					<FaTimesCircle className="mx-auto text-6xl" />
				</div>
				<h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
					Payment Failed
				</h1>
				<p className="mb-6 text-center text-gray-600">
					We're sorry, but there was an issue processing your payment.
				</p>
				<p className="mb-6 text-center text-sm text-red-500">{errorMessage}</p>
				<div className="flex justify-center space-x-4">
					<Link
						to={params.id ? `/user/payment/${params.id}` : "/user/payment"}
						className="rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
					>
						Try Again
					</Link>
					<Link
						to="/user/dashboard"
						className="rounded bg-gray-300 px-6 py-2 font-bold text-gray-700 hover:bg-gray-400"
					>
						Go to Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaymentFailure;
