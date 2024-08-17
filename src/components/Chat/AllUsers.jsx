import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AllUsers = ({
	className,
	loading,
	users,
	onClick,
	activeUser,
	darkMode,
}) => {
	return (
		<div
			className={`rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white"} p-2 shadow sm:p-4 ${className}`}
		>
			<h2 className="animate__animated animate__fadeIn mb-2 text-lg font-bold sm:mb-4 sm:text-xl">
				All Users
			</h2>
			{loading ? (
				<div className="flex justify-center">
					<Spin />
				</div>
			) : (
				<div className="max-h-[400px] overflow-y-auto">
					<List
						dataSource={users}
						renderItem={(user) => (
							<List.Item className="animate__animated animate__fadeIn">
								<Link
									to={`/chat/${user._id}`}
									className={`w-full ${
										activeUser === user._id
											? darkMode
												? "bg-gray-700"
												: "bg-blue-100"
											: ""
									}`}
									onClick={onClick}
								>
									<List.Item.Meta
										avatar={<Avatar icon={<UserOutlined />} />}
										title={`${user.firstName} ${user.lastName} (${user.email})`}
									/>
								</Link>
							</List.Item>
						)}
					/>
				</div>
			)}
		</div>
	);
};

export default AllUsers;
