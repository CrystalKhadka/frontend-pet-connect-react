import {
	HeartOutlined,
	LogoutOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Select } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext/ThemeContext";

const UserNavbar = () => {
	const { toggleTheme } = useTheme();
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "default",
	);
	const user = JSON.parse(localStorage.getItem("user"));
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => setIsModalVisible(true);
	const handleCancel = () => setIsModalVisible(false);

	const handleThemeChange = (value) => {
		setTheme(value);
		toggleTheme(value);
		handleCancel();
	};
	// Custom class for active link
	const activeLinkClass = ({ isActive }) =>
		isActive
			? "block px-3 py-2 mx-auto rounded bg-blue-700 text-white"
			: "block px-3 py-2 mx-auto rounded hover:bg-gray-700 text-gray-700 dark:text-white dark:hover:bg-gray-600";

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	const menu = (
		<Menu>
			<Menu.Item key="1" icon={<UserOutlined />}>
				<NavLink to="/profile">Profile</NavLink>
			</Menu.Item>
			<Menu.Item key="2" icon={<SettingOutlined />}>
				<NavLink to="/my-pets">My Pets</NavLink>
			</Menu.Item>
			<Menu.Item key="3" icon={<HeartOutlined />}>
				<NavLink to="/user/favorite">Favorite</NavLink>
			</Menu.Item>
			<Menu.Item key="4" onClick={showModal}>
				Theme
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
				Sign out
			</Menu.Item>
		</Menu>
	);

	return (
		<motion.nav
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-gray-100 shadow-lg dark:bg-gray-900"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-4">
					<motion.img
						whileHover={{ scale: 1.1 }}
						src="./../../assets/icons/icon.jpg"
						className="h-16"
						alt="App Logo"
					/>

					<div className="hidden space-x-4 text-white md:flex">
						<NavLink
							to={user ? "/user/dashboard" : "/"}
							className={activeLinkClass}
						>
							Home
						</NavLink>
						<NavLink to="/user/pet/list" className={activeLinkClass}>
							Pet List
						</NavLink>
						<NavLink to="/settings" className={activeLinkClass}>
							Settings
						</NavLink>
						{user && (
							<NavLink to="/chat/all" className={activeLinkClass}>
								Chat
							</NavLink>
						)}
					</div>

					<div className="flex items-center text-white">
						{user ? (
							<Dropdown overlay={menu} placement="bottomRight" arrow>
								<Button type="text" className="text-gray-800 dark:text-white">
									{user.firstName} <UserOutlined />
								</Button>
							</Dropdown>
						) : (
							<div className="space-x-2">
								<NavLink to="/login" className="btn-primary">
									Login
								</NavLink>
								<NavLink to="/register" className="btn-secondary">
									Register
								</NavLink>
							</div>
						)}
					</div>
				</div>
			</div>

			<Modal
				title="Choose Theme"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Select
					style={{ width: "100%" }}
					value={theme}
					onChange={handleThemeChange}
				>
					<Select.Option value="light">Light</Select.Option>
					<Select.Option value="dark">Dark</Select.Option>
					<Select.Option value="default">Default</Select.Option>
				</Select>
			</Modal>
		</motion.nav>
	);
};

export default UserNavbar;
