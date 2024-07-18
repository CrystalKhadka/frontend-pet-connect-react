import { Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import {
	getAllUserApi,
	getMessagesApi,
	getUserByIdApi,
	sendMessageApi,
} from "../../apis/Api";
import AllUsers from "../../components/Chat/AllUsers";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";
import ChatMessages from "../../components/Chat/ChatMessages";

const { Content } = Layout;

const socket = io("http://localhost:5000");

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState(null);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const params = useParams();

	const [users, setUsers] = useState([]);

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
		// if params.id is changing
		// reset messages and page

		Promise.all([getUserByIdApi(params.id), getMessagesApi(params.id, page)])
			.then(([userRes, messagesRes]) => {
				setUser(userRes.data.data);
				const previousMessages = messages.slice(0, 5);
				const newMessages = messagesRes.data.messages.reverse();
				setMessages([...newMessages, ...previousMessages]);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to load chat data");
				setLoading(false);
			});

		socket.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			socket.off("message");
		};
	}, [params.id, page]);

	const sendMessage = (text) => {
		const currentUser = JSON.parse(localStorage.getItem("user"));
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

	const loadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<Layout className="h-screen bg-gray-100">
			<Content className="p-4 md:p-6 lg:p-8">
				<div className="mx-auto flex h-full max-w-6xl flex-col md:flex-row">
					<AllUsers
						className="mb-4 md:mb-0 md:mr-4 md:w-1/3 lg:w-1/4"
						users={users}
						loading={loading}
						onCLick={handleUserClick}
					/>
					<div className="flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-lg">
						{loading ? (
							<div className="flex h-full items-center justify-center">
								<Spin size="large" />
							</div>
						) : (
							<>
								<ChatHeader user={user} />
								<ChatMessages messages={messages} onClick={loadMore} />
								<ChatInput onSendMessage={sendMessage} />
							</>
						)}
					</div>
				</div>
			</Content>
		</Layout>
	);
};

export default Chat;
