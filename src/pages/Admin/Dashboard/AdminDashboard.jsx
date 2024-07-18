import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { FaClipboardList, FaHistory, FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { petImageUrl, viewPetByOwnerApi } from "../../../apis/Api";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	PointElement,
	LineElement,
);

const AdminDashboard = () => {
	const [pets, setPets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const id = user.id;

		viewPetByOwnerApi(id)
			.then((response) => {
				setPets(response.data.pets);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching pets:", error);
				setError("Failed to load pets. Please try again later.");
				setLoading(false);
			});
	}, []);

	const latestPets = pets.slice(-3).reverse();

	const DashboardCard = ({ title, icon, children }) => (
		<div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
			<div className="flex items-center bg-blue-600 p-4">
				{icon}
				<h2 className="ml-2 text-xl font-semibold text-white">{title}</h2>
			</div>
			<div className="p-6">{children}</div>
		</div>
	);

	// Sample data for charts
	const petTypeData = {
		labels: ["Dogs", "Cats", "Birds", "Others"],
		datasets: [
			{
				data: [12, 19, 3, 5],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
			},
		],
	};

	const adoptionTrendData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Adoptions",
				data: [12, 19, 3, 5, 2, 3],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	};

	const petAgeData = {
		labels: ["0-1", "1-3", "3-5", "5-10", "10+"],
		datasets: [
			{
				label: "Pet Age Distribution",
				data: [65, 59, 80, 81, 56],
				backgroundColor: "rgba(54, 162, 235, 0.5)",
				borderColor: "rgb(54, 162, 235)",
				borderWidth: 1,
			},
		],
	};

	if (loading)
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	if (error) return <div className="text-center text-red-500">{error}</div>;

	return (
		<div className="min-h-screen bg-gray-100 md:ml-64 md:px-8 md:py-16">
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
					Pet Owner Dashboard
				</h1>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<DashboardCard
						title="Your Pets"
						icon={<FaPaw className="text-2xl text-white" />}
					>
						{latestPets.length > 0 ? (
							<>
								<ul className="space-y-4">
									{latestPets.map((pet) => (
										<li key={pet._id} className="flex items-center space-x-4">
											<img
												src={`${petImageUrl}/${pet.petImage}`}
												alt={pet.petName}
												className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover"
											/>
											<div>
												<h3 className="text-lg font-semibold">{pet.petName}</h3>
												<p className="text-gray-600">{pet.petSpecies}</p>
											</div>
										</li>
									))}
								</ul>
								<Link
									to="/admin/myPet/list"
									className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
								>
									View All Pets
								</Link>
							</>
						) : (
							<p className="text-gray-500">No pets available</p>
						)}
					</DashboardCard>

					<DashboardCard
						title="Pet Types Distribution"
						icon={<FaClipboardList className="text-2xl text-white" />}
					>
						<Doughnut data={petTypeData} />
					</DashboardCard>

					<DashboardCard
						title="Adoption Trends"
						icon={<FaHistory className="text-2xl text-white" />}
					>
						<Line data={adoptionTrendData} />
					</DashboardCard>

					<DashboardCard
						title="Pet Age Distribution"
						icon={<FaClipboardList className="text-2xl text-white" />}
					>
						<Bar data={petAgeData} />
					</DashboardCard>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
