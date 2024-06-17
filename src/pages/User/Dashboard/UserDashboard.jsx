import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllPetsApi } from "../../../apis/Api";

const UserDashboard = () => {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		// Fetch all pets
		getAllPetsApi()
			.then((res) => setPets(res.data.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
	};

	return (
		<>
			<div className="container-fluid min-h-screen">
				{/* Gap */}
				<div className="py-4"></div>
				<div>
					<div className="text-center text-3xl font-bold">
						<p>Every Pet Deserves a Loving Home.</p>
						<p>
							<span className="text-yellow-400">Adopt</span> a Pet Today
						</p>
					</div>
					<div className="my-5 pt-5 text-center text-2xl">
						<p>
							Browse our available animals and learn more about the adoption
							process.
						</p>
						<p>
							Thank you for supporting our mission to bring joy to families
							through pet adoption.
						</p>
					</div>
				</div>
				<div className="mb-5 flex justify-center">
					<form className="flex">
						<select name="" id="" className="mr-2 rounded border p-2">
							<option value="">Dog</option>
							<option value="">Cat</option>
							<option value="">Hamster</option>
						</select>
						<input
							type="text"
							placeholder="search for pets"
							className="w-full max-w-52 rounded border p-2"
						/>
						<button
							type="button"
							className="flex h-full items-center bg-black px-3 text-white"
						>
							<i className="bi bi-search px-2"></i>
							Search
						</button>
					</form>
				</div>
				{pets.length > 0 ? (
					<div className="my-10  overflow-auto py-10">
						<Slider {...settings}>
							{pets.map((pet) => (
								<div key={pet._id} className="m-2 rounded border p-4 shadow-lg">
									<img
										src={`http://localhost:5000/pets/${pet.petImage}`}
										alt={pet.petName}
										className="rounded object-cover"
										style={{
											width: "100%",
											height: "200px",
										}}
									/>
									<h3 className="text-xl font-bold">{pet.petName}</h3>
									<p className="text-gray-700">{pet.petSpecies}</p>
								</div>
							))}
						</Slider>
					</div>
				) : (
					<p className="text-center text-2xl font-bold text-red-500">
						No pets available
					</p>
				)}
			</div>
		</>
	);
};

export default UserDashboard;
