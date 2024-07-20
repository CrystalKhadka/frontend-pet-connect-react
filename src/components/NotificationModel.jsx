import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { url } from "../apis/Api";
const currentUser = JSON.parse(localStorage.getItem("user"));
const socket = io(url, {
	query: {
		id: currentUser?.id ?? "",
	},
});
const NotificationModel = () => {
	useEffect(() => {
		socket.on("sended", (message) => {
			const notification = {
				message: "New message from " + message.sender.email,
				receiver: message.receiver,
			};

			toast.info(notification.message);
		});
		return () => {
			socket.off("sended");
		};
	}, []);
	return <div></div>;
};

export default NotificationModel;
