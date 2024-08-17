import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Link, Navigate } from "react-router-dom";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const Homepage = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 500);
		return () => clearTimeout(timer);
	}, []);

	const chartData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Pets Adopted",
				data: [12, 19, 3, 5, 2, 3],
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	};

	if (user) {
		return user.role === "owner" ? (
			<Navigate to="/admin/dashboard" />
		) : (
			<Navigate to="/user/dashboard" />
		);
	}

	return (
		<div className="bg-[url('../public/assets/images/bg.png')] bg-cover bg-center bg-no-repeat">
			<div className="container mx-auto flex min-h-screen flex-col justify-center py-12 sm:px-4 lg:px-8">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="hero-section py-32 text-center"
				>
					<div className="container mx-auto px-4">
						<h1 className="shadow-text mb-4 text-5xl font-bold text-white md:text-7xl">
							Find Your Perfect Pet
						</h1>
						<p className="shadow-text mb-8 text-xl text-white md:text-3xl">
							Adopt a furry friend today and make a difference!
						</p>
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								className="btn btn-primary rounded bg-blue-500 px-6 py-3 font-bold text-white transition duration-300 hover:bg-blue-700"
								to="/login"
							>
								Get Started
							</Link>
						</motion.div>
					</div>
				</motion.div>

				{/* About Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isVisible ? 1 : 0 }}
					transition={{ duration: 0.8 }}
					className="about-section rounded-lg bg-white bg-opacity-80 py-20 shadow-lg"
				>
					<div className="container mx-auto px-4 text-center">
						<h2 className="mb-6 text-4xl font-bold text-gray-800">
							About PetConnect
						</h2>
						<p className="mb-10 text-xl text-gray-600">
							PetConnect simplifies pet adoption through location-based
							searching, connecting adopters with nearby pet owners or shelters.
							Our features include pet browsing, messaging, and user profiles,
							enhancing the experience for both adopters and owners.
						</p>
						<p className="mb-10 text-xl text-gray-600">
							Our mission is to promote responsible pet ownership and reduce
							shelter overpopulation. We leverage technology to create an
							accessible and efficient platform for connecting pets with loving
							homes.
						</p>
						<div className="mx-auto w-full max-w-2xl">
							<Line
								data={chartData}
								options={{
									responsive: true,
									plugins: {
										legend: { position: "top" },
										title: { display: true, text: "Adoption Trends" },
									},
								}}
							/>
						</div>
					</div>
				</motion.div>

				{/* Contact Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isVisible ? 1 : 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="contact-section mt-10 rounded-lg bg-white bg-opacity-80 py-20 shadow-lg"
				>
					<div className="container z-10 mx-auto px-4">
						<h2 className="mb-6 text-4xl font-bold text-gray-800">
							Contact Us
						</h2>
						<p className="mb-10 text-xl text-gray-600">
							Have questions or feedback? Reach out to us!
						</p>
						<form className="mx-auto max-w-lg">
							<motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									className="w-full rounded border p-3 transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</motion.div>
							<motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
								<input
									type="email"
									name="email"
									placeholder="Your Email"
									className="w-full rounded border p-3 transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</motion.div>
							<motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
								<textarea
									name="message"
									placeholder="Your Message"
									className="w-full rounded border p-3 transition duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								></textarea>
							</motion.div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="submit"
								className="btn btn-primary rounded bg-blue-500 px-6 py-3 font-bold text-white transition duration-300 hover:bg-blue-700"
							>
								Send Message
							</motion.button>
						</form>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Homepage;
