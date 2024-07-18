import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { getMessagesApi, getUserByIdApi, sendMessageApi } from "../../apis/Api";
import AllUsers from "../../components/Chat/AllUsers";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";
import ChatMessages from "../../components/Chat/ChatMessages";

const { Content } = Layout;

// Initialize Socket.io
const socket = io("http://localhost:5000");

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const params = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		getUserByIdApi(params.id)
			.then((res) => {
				console.log(res.data);
				setUser(res.data.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});

		getMessagesApi(params.id)
			.then((res) => {
				const message = res.data.messages;
				// Reverse it
				message.reverse();
				setMessages(message);
			})
			.catch((err) => {
				console.log(err.response.data);
			});

		// Listen for new messages
		socket.on("message", (message) => {
			console.log(message);
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("newMessage");
		};
	}, [params]);

	useEffect(() => {}, []);

	const sendMessage = (text) => {
		const user = JSON.parse(localStorage.getItem("user"));

		const data = {
			message: text,
			receiver: params.id,
			sender: user.id,
		};

		sendMessageApi(data)
			.then((res) => {
				toast.success("Message sent");
				// Emit the new message event
				socket.emit("sendMessage", res.data.newMessage);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<Layout className="flex h-screen w-full bg-gray-100">
			<Content className="mx-auto flex w-full flex-row p-4">
				<AllUsers />
				<div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
					<ChatHeader user={user} />
					<ChatMessages messages={messages} />
					<ChatInput onSendMessage={sendMessage} />
				</div>
			</Content>
		</Layout>
	);
};

export default Chat;
