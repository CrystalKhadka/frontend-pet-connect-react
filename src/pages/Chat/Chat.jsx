import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout, Spin, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	getAllUserApi,
	getMessagesApi,
	getUserByIdApi,
	sendFileApi,
	sendMessageApi,
	sendNotificationApi,
} from "../../apis/Api";
import AllUsers from "../../components/Chat/AllUsers";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";
import ChatMessages from "../../components/Chat/ChatMessages";
import "./Chat.css";

const { Content } = Layout;
const currentUser = JSON.parse(localStorage.getItem("user"));

const Chat = ({ socket }) => {
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState(null);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [isTyping, setIsTyping] = useState(false);
	const [users, setUsers] = useState([]);
	const [darkMode, setDarkMode] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [editingMessage, setEditingMessage] = useState(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [currentInput, setCurrentInput] = useState("");
	const [fileUploadProgress, setFileUploadProgress] = useState(0);

	const params = useParams();
	const typingTimeoutRef = useRef(null);
	const chatContainerRef = useRef(null);
	const [showUsers, setShowUsers] = useState(false);

	useEffect(() => {
		socket.emit("newUser", currentUser.id);
	}, [socket]);

	useEffect(() => {
		getAllUserApi()
			.then((res) => setUsers(res.data.data))
			.catch((err) => console.error(err));

		return () => {
			socket.off("message");
			socket.off("typingNow");
			socket.off("sended");
		};
	}, []);

	useEffect(() => {
		if (params.id === "all") {
			setLoading(false);
			return;
		}
		setLoading(true);

		if (params.id === currentUser.id) {
			toast.error("You can't chat with yourself");
			setLoading(false);
			return;
		}

		if (user?._id !== params.id) {
			setMessages([]);
			setPage(1);
		}

		Promise.all([getUserByIdApi(params.id), getMessagesApi(params.id, 1)])
			.then(([userRes, messagesRes]) => {
				setUser(userRes.data.data);
				setMessages(messagesRes.data.messages.reverse());
				setLoading(false);
				setHasMore(messagesRes.data.messages.length === 20);
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to load chat data");
				setLoading(false);
			});

		socket.on("message", handleNewMessage);

		socket.on("typingNow", handleTypingIndicator);
		socket.on("receiveMessage", (message) => {
			toast.info(`${message.sender.firstName} sent you a message`);
		});

		return () => {
			socket.off("message", handleNewMessage);

			socket.off("typingNow", handleTypingIndicator);
		};
	}, [params.id]);

	const handleNewMessage = (message) => {
		if (
			params.id === message.sender._id ||
			params.id === message.receiver._id
		) {
			setMessages((prevMessages) => [...prevMessages, message]);
			const notification = {
				message: `You have a new message from ${message.sender.firstName}`,
				receiver: message.receiver._id,
			};
			handleNotification(notification);

			scrollToBottom();
		}
	};

	const handleNotification = (notification) => {
		sendNotificationApi(notification)
			.then((res) => {
				console.log(res);
				const notification = res.data.newNotification;
				socket.emit("sendNotification", notification);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleTypingIndicator = (data) => {
		if (data.sender === params.id) {
			setIsTyping(true);
			clearTimeout(typingTimeoutRef.current);
			typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
		}
	};

	const fetchMoreMessages = () => {
		if (!hasMore) return;
		setPage((prevPage) => prevPage + 1);
		getMessagesApi(params.id, page + 1)
			.then((res) => {
				const newMessages = res.data.messages.reverse();
				setMessages((prevMessages) => [...newMessages, ...prevMessages]);
				setHasMore(newMessages.length === 20);
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to load more messages");
			});
	};

	const sendMessage = (text, type) => {
		const data = {
			message: text,
			receiver: params.id,
			sender: currentUser.id,
			type: type,
		};

		sendMessageApi(data)
			.then((res) => {
				// socket.emit("sendMessage", res.data.newMessage);
				scrollToBottom();
			})
			.catch((err) => {
				toast.error("Failed to send message");
			});
	};

	const handleTyping = () => {
		socket.emit("typing", { receiver: params.id, sender: currentUser.id });
	};

	const onFileUpload = (file) => {
		const formData = new FormData();
		formData.append("file", file);

		// const totalTime = 3000; // 3 seconds for the entire "upload"
		// const interval = 100; // Update every 100ms
		// let progress = 0;

		// const timer = setInterval(() => {
		// 	progress += (interval / totalTime) * 100;
		// 	if (progress >= 100) {
		// 		clearInterval(timer);
		// 		progress = 100;
		// 		// Simulate upload completion
		// 		sendMessage(`File uploaded: ${file.name}`);
		// 		setFileUploadProgress(0);
		// 	} else {
		// 		setFileUploadProgress(Math.round(progress));
		// 	}
		// }, interval);

		const config = {
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				);
				setFileUploadProgress(percentCompleted);
			},
		};

		// setCurrentInput(file.name);

		sendFileApi(formData, config)
			.then((res) => {
				sendMessage(res.data.file, res.data.type);
				setFileUploadProgress(0);
			})
			.catch((err) => {
				toast.error("Failed to upload file");
				setFileUploadProgress(0);
			});
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		// Apply dark mode styles to your app
	};

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	const toggleUsers = () => {
		setShowUsers(!showUsers);
	};
	return (
		<Layout
			className={`h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}
		>
			<Content className="p-4 md:p-6 lg:p-8">
				<div className="mx-auto flex h-full max-w-6xl flex-col md:flex-row">
					<Button
						icon={<MenuOutlined />}
						onClick={toggleUsers}
						className="mb-4 md:hidden"
					>
						Toggle Users
					</Button>
					<AllUsers
						className={`mb-4 w-full md:mb-0 md:mr-4 md:w-1/3 lg:w-1/4 ${
							showUsers ? "block" : "hidden md:block"
						}`}
						users={users}
						loading={loading}
						onClick={() => {
							setMessages([]);
							setPage(1);
							setShowUsers(false); // Hide users list on mobile after selecting a user
						}}
						activeUser={params.id}
						darkMode={darkMode}
					/>
					<div
						className={`flex flex-grow flex-col overflow-hidden rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
					>
						{loading ? (
							<div className="flex h-full items-center justify-center">
								<Spin size="large" />
							</div>
						) : user == null ? (
							<>
								<div>
									<h1 className="text-center text-2xl font-bold">
										Select a user to start chatting
									</h1>
								</div>
							</>
						) : (
							<>
								<ChatHeader user={user} darkMode={darkMode} />
								<Switch
									checked={darkMode}
									onChange={toggleDarkMode}
									className="ml-auto mr-4 mt-2"
								/>
								<div
									id="scrollableDiv"
									ref={chatContainerRef}
									style={{ height: "400px", overflow: "auto" }}
								>
									<InfiniteScroll
										dataLength={messages.length}
										next={fetchMoreMessages}
										hasMore={hasMore}
										loader={<h4>Loading...</h4>}
										scrollableTarget="scrollableDiv"
										inverse={true}
										style={{
											display: "flex",
											flexDirection: "column-reverse",
										}}
									>
										<ChatMessages
											messages={messages}
											isTyping={isTyping}
											darkMode={darkMode}
											currentUser={currentUser}
										/>
									</InfiniteScroll>
								</div>
								<ChatInput
									onSendMessage={sendMessage}
									onTyping={handleTyping}
									onFileUpload={onFileUpload}
									darkMode={darkMode}
									showEmojiPicker={showEmojiPicker}
									setShowEmojiPicker={setShowEmojiPicker}
									currentInput={currentInput}
									setCurrentInput={setCurrentInput}
									fileUploadProgress={fileUploadProgress}
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
