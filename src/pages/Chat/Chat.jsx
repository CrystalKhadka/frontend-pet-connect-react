/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import {
	getAllUserApi,
	getMessagesApi,
	getUserByIdApi,
	sendMessageApi,
	sendNotificationApi,
	url,
} from "../../apis/Api";
import AllUsers from "../../components/Chat/AllUsers";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";
import ChatMessages from "../../components/Chat/ChatMessages";

// import css
import "./Chat.css";

const { Content } = Layout;
const currentUser = JSON.parse(localStorage.getItem("user"));
const socket = io(url, {
	query: {
		id: currentUser?.id ?? "",
	},
});

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState(null);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const [isTyping, setIsTyping] = useState(false);
	const [users, setUsers] = useState([]);
	const typingTimeoutRef = useRef(null);
	const [num, setNum] = useState(0);

	useEffect(() => {
		getAllUserApi()
			.then((res) => {
				setUsers(res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		setLoading(true);

		if (params.id === currentUser.id) {
			toast.error("You can't chat with yourself");
			setLoading(false);
			return;
		}

		// set messages and page to default if user switched
		if (user?._id !== params.id) {
			setMessages([]);
			setPage(1);
		}

		Promise.all([getUserByIdApi(params.id), getMessagesApi(params.id, page)])
			.then(([userRes, messagesRes]) => {
				const prevMessages = messages.slice(0, 5);
				const newMessages = messagesRes.data.messages.reverse();
				setUser(userRes.data.data);
				setMessages([...newMessages, ...prevMessages]);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to load chat data");
				setLoading(false);
			});

		socket.on("message", (message) => {
			console.log(message);
			if (
				params.id === message.sender._id ||
				params.id === message.receiver._id
			) {
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});

		socket.on("sended", (message) => {
			const notification = {
				message: "New message from " + message.sender.email,
				receiver: message.receiver._id,
				sender: message.sender.firstName,
			};

			sendNotificationApi(notification)
				.then((res) => {
					toast.success(res.data.message);
				})
				.catch((err) => {
					console.error(err);
				});
		});

		socket.on("typingNow", (data) => {
			if (data.sender === params.id) {
				setIsTyping(true);
				clearTimeout(typingTimeoutRef.current);
				typingTimeoutRef.current = setTimeout(() => {
					setIsTyping(false);
				}, 3000);
			}
		});

		return () => {
			socket.off("message");
			socket.off("typingNow");
			socket.off("sended");
		};
	}, [params.id, page]);

	const sendMessage = (text) => {
		const data = {
			message: text,
			receiver: params.id,
			sender: currentUser.id,
		};

		sendMessageApi(data)
			.then((res) => {
				socket.emit("sendMessage", res.data.newMessage);
			})
			.catch((err) => {
				toast.error("Failed to send message");
			});
	};

	const handleUserClick = () => {
		setMessages([]);
		setPage(1);
	};

	const handleTyping = () => {
		const data = {
			receiver: params.id,
			sender: currentUser.id,
		};
		socket.emit("typing", data);
	};

	return (
		<Layout className="h-screen bg-gray-100">
			<Content className="p-4 md:p-6 lg:p-8">
				<div className="mx-auto flex h-full max-w-6xl flex-col md:flex-row">
					<AllUsers
						className="mb-4  md:mb-0 md:mr-4 md:block md:w-1/3 lg:w-1/4"
						users={users}
						loading={loading}
						onClick={handleUserClick}
						activeUser={params.id}
					/>
					<div className="flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-lg">
						{loading ? (
							<div className="flex h-full items-center justify-center">
								<Spin size="large" />
							</div>
						) : (
							<>
								<ChatHeader user={user} />
								<ChatMessages
									messages={messages}
									onClick={() => {
										setPage(page + 1);
									}}
									isTyping={isTyping}
								/>
								<ChatInput
									onSendMessage={sendMessage}
									onTyping={handleTyping}
								/>
							</>
						)}
					</div>
				</div>
			</Content>
		</Layout>
	);
};

export default Chat;
