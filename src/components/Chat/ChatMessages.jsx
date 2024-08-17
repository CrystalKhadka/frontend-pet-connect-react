import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import { messageFileUrl, messageImageUrl } from "../../apis/Api";

const ChatMessages = ({ messages, isTyping, darkMode, currentUser }) => {
	const renderMessage = (message) => {
		const isOwnMessage = message.sender._id === currentUser.id;
		const isFile = message.type === "file";
		const isImage = message.type === "image";
		const messageClass = isOwnMessage
			? `flex justify-end`
			: `flex justify-start`;
		const bubbleClass = isOwnMessage
			? `bg-blue-500 text-white`
			: darkMode
				? `bg-gray-700 text-white`
				: `bg-gray-200 text-black`;

		return (
			<div key={message._id} className={`mb-4 ${messageClass}`}>
				<div className={`max-w-xs rounded-lg p-3 lg:max-w-md ${bubbleClass}`}>
					<div className="mb-2 flex items-center">
						<Avatar
							icon={<UserOutlined />}
							className={`${isOwnMessage ? "order-2 ml-2" : "order-1 mr-2"}`}
						/>
						<span className="text-xs font-semibold">
							{isOwnMessage ? "You" : message.sender.firstName}
						</span>
					</div>
					<p className="break-words">
						{isFile ? (
							<a
								href={`${messageFileUrl}/${message.message}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{message.message}
							</a>
						) : isImage ? (
							<img
								src={`${message ? messageImageUrl : ""}/${message.message}`}
								alt="message"
							/>
						) : (
							message.message
						)}
					</p>
					<div className="mt-1 text-right text-xs opacity-70">
						{moment(message.createdAt).format("HH:mm")}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`flex-grow overflow-y-auto p-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
		>
			{messages.map(renderMessage)}
			{isTyping && (
				<div className="flex justify-start">
					<div
						className={`max-w-xs rounded-lg p-3 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
					>
						<div className="typing-indicator">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatMessages;
