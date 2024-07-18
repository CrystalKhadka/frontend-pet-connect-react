import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const ChatMessages = ({ messages, onClick }) => {
	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<div className="flex-grow overflow-y-auto bg-gray-50 p-4">
			{/* Load more */}
			<div className="mb-4 flex justify-center" onClick={onClick}>
				<button className="font-semibold text-purple-600">Load more</button>
			</div>
			{messages.map((message) => (
				<div
					key={message._id}
					className={`mb-4 flex ${
						message.sender === user.id ? "justify-end" : "justify-start"
					}`}
				>
					<div
						className={`max-w-xs rounded-lg p-3 ${
							message.sender === user.id
								? "bg-purple-600 text-white"
								: "bg-gray-300 text-gray-800"
						}`}
					>
						<div className="mb-2 flex items-center">
							<Avatar
								icon={<UserOutlined />}
								className={`mr-2 ${
									message.sender === user.id ? "order-2" : "order-1"
								}`}
							/>
							<span className="text-xs">
								{message.sender === user.id ? "You" : "Other User"}
							</span>
						</div>
						<p>{message.message}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
