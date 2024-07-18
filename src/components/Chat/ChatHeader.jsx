import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

function ChatHeader({ user }) {
	return (
		<header className="flex items-center justify-between bg-purple-600 p-4 text-white">
			<div className="flex items-center">
				<img
					src="/pet-connect-logo.png"
					alt="Pet Connect"
					className="mr-2 h-8 w-8"
				/>
				<h1 className="text-xl font-bold">Pet Connect</h1>
			</div>
			<div className="flex items-center">
				<Avatar icon={<UserOutlined />} className="mr-2" />
				<div className="mr-4">
					<div className="font-semibold">
						{user?.firstName} {user?.lastName}
					</div>
					<div className="text-xs">online</div>
				</div>
			</div>
		</header>
	);
}

export default ChatHeader;
