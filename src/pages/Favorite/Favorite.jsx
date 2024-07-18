import { Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { getFavoriteApi } from "../../apis/Api";
import PetCard from "../../components/PetCard";

const Favorite = () => {
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		getFavoriteApi()
			.then((response) => {
				setFavorites(response.data.favorites);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError("Error fetching favorite pets");
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<motion.h1
					className="mb-8 flex items-center text-4xl font-extrabold text-gray-900"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<HeartIcon className="mr-3 h-10 w-10 text-red-500" />
					Your Favorite Pets
				</motion.h1>

				<Transition
					show={!isLoading}
					enter="transition-opacity duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					{error ? (
						<div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
							<p className="text-lg font-semibold">{error}</p>
							<button
								className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
								onClick={() => window.location.reload()}
							>
								Try Again
							</button>
						</div>
					) : favorites.length === 0 ? (
						<div className="mt-10 text-center">
							
							<p className="mt-4 text-xl font-semibold text-gray-600">
								You haven't added any pets to your favorites yet.
							</p>
							<p className="mt-2 text-gray-500">
								Start exploring and heart the pets you love!
							</p>
							<button
								className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
								onClick={() => {
									/* Navigate to pet list */
								}}
							>
								Explore Pets
							</button>
						</div>
					) : (
						<motion.div
							className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.1 },
								},
							}}
						>
							{favorites.map((favorite) => (
								<motion.div
									key={favorite.id}
									variants={{
										hidden: { y: 20, opacity: 0 },
										visible: { y: 0, opacity: 1 },
									}}
								>
									<PetCard pet={favorite.pet} favorites={favorites} />
								</motion.div>
							))}
						</motion.div>
					)}
				</Transition>

				{isLoading && (
					<div className="flex h-64 items-center justify-center">
						<div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Favorite;
