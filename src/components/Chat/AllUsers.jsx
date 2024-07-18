import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AllUsers = ({ className, loading, users, onCLick }) => {
	return (
		<div className={`rounded-lg bg-white p-4 shadow ${className}`}>
			<h2 className="mb-4 text-xl font-bold">All Users</h2>
			{loading ? (
				<div className="flex justify-center">
					<Spin />
				</div>
			) : (
				<List
					dataSource={users}
					renderItem={(user) => (
						<List.Item>
							<Link
								to={`/chat/${user._id}`}
								className="w-full"
								onClick={onCLick}
							>
								<List.Item.Meta
									avatar={<Avatar icon={<UserOutlined />} />}
									title={`${user.firstName} ${user.lastName} (${user.role})`}
								/>
							</Link>
						</List.Item>
					)}
				/>
			)}
		</div>
	);
};

export default AllUsers;
