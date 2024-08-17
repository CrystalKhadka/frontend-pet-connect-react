import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { profileImageUrl } from "../../apis/Api";

const ChatHeader = ({ user }) => {
	return (
		<header className="flex items-center justify-between bg-purple-600 p-4 text-white">
			<div className="flex items-center">
				<img
					src="../assets/icons/icon.jpg"
					alt="Pet Connect"
					className="mr-2 h-8 w-8"
				/>
				<h1 className="hidden text-xl font-bold sm:inline">Pet Connect</h1>
			</div>
			<div className="flex items-center">
				<Avatar
					{...{
						icon: <UserOutlined />,
						src: `${profileImageUrl}/${user?.image}`,
						alt: `${user?.firstName} ${user?.lastName} profile image`,
					}}
					className="mr-2"
				/>
				<div>
					<div className="font-semibold">
						{user?.firstName} {user?.lastName}
					</div>
					<div className="text-xs">online</div>
				</div>
			</div>
		</header>
	);
};

export default ChatHeader;
