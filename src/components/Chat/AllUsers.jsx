// src/components/Chat/AllUsers.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUserApi } from "../../apis/Api";

const AllUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUserApi()
			.then((res) => {
				setUsers(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<div className="w-1/4 bg-gray-200 p-4">
			<h2 className="mb-4 text-xl font-bold">All Users</h2>
			<ul>
				{users.map((user) => (
					<li key={user._id} className="mb-2">
						<Link
							to={`/chat/${user._id}`}
							className="text-blue-500 hover:underline"
						>
							{user.firstName}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AllUsers;
