import React from "react";

function ChatMessages({ messages }) {
	const user = JSON.parse(localStorage.getItem("user"));
	return (
		<div className="h-96 overflow-y-auto bg-gray-50 p-4">
			{messages.map((message) => (
				<div
					key={message._id}
					className={`max-w-3/4 mb-2 rounded-lg p-2 ${
						message.sender === user.id
							? "ml-auto w-full max-w-sm bg-purple-600 text-right text-white"
							: "max-w-sm bg-gray-300 text-gray-800"
					}`}
				>
					{message.message}
				</div>
			))}
		</div>
	);
}

export default ChatMessages;
