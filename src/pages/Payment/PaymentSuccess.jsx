import React, { useEffect, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { khaltiPayment, verifyKhaltiPayment } from "../../apis/Api";

const PaymentSuccess = () => {
	const location = useLocation();
	const queryParams = useMemo(
		() => new URLSearchParams(location.search),
		[location.search],
	);
	const transactionId = queryParams.get("transaction_id");

	useEffect(() => {
		// http://localhost:3000/payment-success?pidx=paeW9ZZ6R9iQHWhdBYfrEV&transaction_id=t2bpLvZ8XZoFaZWeWgctaK&tidx=t2bpLvZ8XZoFaZWeWgctaK&amount=100000&total_amount=100000&mobile=98XXXXX001&status=Completed&purchase_order_id=66b5ac775dc74b5bfdb36ef1&purchase_order_name=Pet%20Adoption&extra=%7BpetId%3A%2066aa3fd0108a429505bdf7a4%2C%20adoptionDate%3A%202024-08-09T05%3A43%3A19.325Z%7D

		// const data = {
		// 	 	transactionId: queryParams.get("transaction_id"),
		// 	amount: queryParams.get("amount"),
		// 	pidx: queryParams.get("pidx"),
		// 	tidx: queryParams.get("tidx"),
		// 	total_amount: queryParams.get("total_amount"),
		// 	mobile: queryParams.get("mobile"),
		// 	status: queryParams.get("status"),
		// 	purchase_order_id: queryParams.get("purchase_order_id"),
		// 	purchase_order_name: queryParams.get("purchase_order_name"),
		// 	extra: queryParams.get("extra"),
		// };
		// console.log(data);

		const pidx = queryParams.get("pidx");
		verifyKhaltiPayment({ token: pidx })
			.then((res) => {
				console.log(res);
				if (res.data.data.status !== "Completed") {
					toast.error("Payment verification failed");
					return;
				}
				const data = {
					transactionId: queryParams.get("transaction_id"),
					amount: queryParams.get("total_amount"),
					status: queryParams.get("status"),
					purchase_order_id: queryParams.get("purchase_order_id"),
					purchase_order_name: queryParams.get("purchase_order_name"),
					extra: queryParams.get("extra"),
				};
				khaltiPayment(data)
					.then((res) => {
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
