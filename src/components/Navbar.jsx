/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import AdminNavbar from "./admin/AdminNavbar";
import UserNavbar from "./user/UserNavbar";
import { toast } from "react-toastify";

const Navbar = ({ socket }) => {
	const user = JSON.parse(localStorage.getItem("user"));
	useEffect(() => {
		socket.emit("newUser", user?.id ?? "Guest");

		return () => {
			socket.off("newUser");
		};
	}, [socket, user]);

	useEffect(() => {
		if (socket) {
			socket.on("receiveNotification", (notification) => {
				console.log(notification);
				toast.info(notification.message)
					
			});

			return () => {
				socket.off("receiveNotification");
			};
		}
	}, [socket]);

	return user && user.role === "owner" ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;
