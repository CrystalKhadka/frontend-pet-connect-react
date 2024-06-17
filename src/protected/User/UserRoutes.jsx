import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	return user != null && user.role === "adopter" ? (
		<Outlet />
	) : (
		<Navigate to={"/login"} />
	);
};

export default UserRoutes;