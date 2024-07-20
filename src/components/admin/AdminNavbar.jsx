import React, { useEffect, useState } from "react";
import {
	FaClipboardList,
	FaCog,
	FaEnvelope,
	FaHeart,
	FaHome,
	FaPaw,
	FaSignOutAlt,
	FaUser,
} from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext/ThemeContext";

const AdminNavbar = () => {
	const { toggleTheme } = useTheme();
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "default",
	);
	const [isOpen, setIsOpen] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				if (location.pathname.includes("/chat")) {
					setIsOpen(false);
				} else {
					setIsOpen(true);
				}
			} else {
				setIsOpen(false);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [location.pathname]);

	const NavItem = ({ to, icon, children }) => (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors duration-300 ${
					isActive
						? "bg-blue-600 text-white"
						: "text-gray-600 hover:bg-blue-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700"
				}`
			}
		>
			{icon}
			<span>{children}</span>
		</NavLink>
	);

	const handleSignOut = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		window.location.reload();
	};

	const isChatPage = location.pathname.includes("/chat");

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`fixed left-4 top-4 z-50 rounded-full bg-blue-600 p-2 text-white shadow-lg ${isChatPage ? "" : "md:hidden"}`}
			>
				{isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
			</button>

			<aside
				className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-white shadow-xl transition-all duration-300 ease-in-out dark:bg-gray-800 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} `}
			>
				<div className="flex h-full flex-col justify-between p-4">
					<div>
						<h1 className="mb-8 text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
							Pet Owner Dashboard
						</h1>
						<nav className="space-y-2">
							<NavItem
								to="/admin/dashboard"
								icon={<FaHome className="text-xl" />}
							>
								Dashboard
							</NavItem>
							<NavItem
								to="/admin/myPet/list"
								icon={<FaPaw className="text-xl" />}
							>
								Pet Profiles
							</NavItem>
							<NavItem to="/pet/adopted" icon={<FaHeart className="text-xl" />}>
								Adopted Pets
							</NavItem>
							<NavItem
								to="/pet/applications"
								icon={<FaClipboardList className="text-xl" />}
							>
								Applications
							</NavItem>
							<NavItem to="/chat/all" icon={<FaEnvelope className="text-xl" />}>
								Messaging
							</NavItem>
						</nav>
					</div>

					<div className="space-y-4">
						<div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
							<div className="mb-2 flex items-center space-x-3">
								<FaUser className="text-2xl text-blue-500" />
								<span className="font-semibold">{user.firstName}</span>
							</div>
							<NavLink
								to="/profile"
								className="text-sm text-blue-600 hover:underline dark:text-blue-400"
							>
								View Profile
							</NavLink>
						</div>

						<div className="space-y-2">
							<NavLink
								to="/settings"
								className="flex items-center space-x-3 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
							>
								<FaCog />
								<span>Settings</span>
							</NavLink>
							<div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
								<label
									htmlFor="theme-select"
									className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Theme
								</label>
								<select
									id="theme-select"
									className="w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 shadow-sm focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
									value={theme}
									onChange={(e) => {
										setTheme(e.target.value);
										toggleTheme(e.target.value);
									}}
								>
									<option value="light">Light</option>
									<option value="dark">Dark</option>
									<option value="default">Default</option>
								</select>
							</div>
							<button
								onClick={handleSignOut}
								className="flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
							>
								<FaSignOutAlt />
								<span>Sign out</span>
							</button>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default AdminNavbar;
