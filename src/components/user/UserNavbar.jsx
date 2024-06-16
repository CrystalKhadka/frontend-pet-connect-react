import React from "react";
import { NavLink } from "react-router-dom";

const UserNavbar = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	// Custom class for active link
	const activeLinkClass = ({ isActive }) =>
		isActive
			? "block bg-blue-700 px-3 py-2 text-white mx-auto disabled-link"
			: "block px-3 py-2 text-white hover:bg-gray-700 mx-auto";

	return (
		<nav className="bg-gray-800 text-white">
			<div className="container mx-auto flex flex-wrap items-center justify-between p-4">
				{/* Logo */}

				<img
					src="./../assets/icons/icon.jpg"
					className="h-16 "
					alt="App Logo"
				/>

				{/* Mobile Menu Button */}
				<button
					data-collapse-toggle="navbar-dropdown"
					type="button"
					className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
					aria-controls="navbar-dropdown"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="h-5 w-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>

				{/* Desktop Menu */}
				<div
					id="navbar-dropdown"
					className="hidden w-full flex-col md:flex md:w-auto md:flex-1 md:flex-row md:justify-between"
				>
					<div></div>
					<div className="mt-4 flex w-full flex-col p-4 font-medium md:mt-0 md:w-auto md:flex-row md:p-0">
						<NavLink to="/" className={activeLinkClass}>
							Home
						</NavLink>
						<NavLink to="/pet/list" className={activeLinkClass}>
							Pet List
						</NavLink>
						<NavLink to="/settings" className={activeLinkClass}>
							Settings
						</NavLink>
						{user ? (
							<NavLink to="/chat" className={activeLinkClass}>
								Chat
							</NavLink>
						) : (
							<></>
						)}
					</div>

					{/* User Dropdown */}
					<div className="flex w-full justify-start md:w-auto">
						{user ? (
							<div>
								<button
									id="dropdownNavbarLink"
									data-dropdown-toggle="dropdownNavbar"
									className="flex w-full items-center justify-between px-3 py-2 text-white md:w-auto"
								>
									{user.firstName}
									<svg
										className="ms-2.5 h-2.5 w-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 4 4 4-4"
										/>
									</svg>
								</button>
								<div
									id="dropdownNavbar"
									className="z-10 hidden divide-y divide-gray-100 rounded-lg bg-white font-normal shadow"
								>
									<ul
										className="py-2 text-sm text-gray-700"
										aria-labelledby="dropdownLargeButton"
									>
										<li>
											<NavLink
												to="/profile"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-100 px-4 py-2"
														: "block px-4 py-2 hover:bg-gray-100"
												}
											>
												Profile
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/my-pets"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-100 px-4 py-2"
														: "block px-4 py-2 hover:bg-gray-100"
												}
											>
												My Pets
											</NavLink>
											<NavLink
												to="/favorite"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-700 px-3 py-2 text-white"
														: "block px-3 py-2 text-white hover:bg-gray-700"
												}
											>
												Favorite
											</NavLink>
										</li>
										<li></li>
									</ul>
									<div className="py-1">
										<button
											onClick={() => {
												localStorage.removeItem("user");
												localStorage.removeItem("token");
												window.location.href = "/";
											}}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="flex space-x-2">
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive
											? "disabled-link block rounded bg-gray-500 px-3 py-2 text-white"
											: "block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
									}
								>
									Login
								</NavLink>
								<NavLink
									to="/register"
									className={({ isActive }) =>
										isActive
											? "disabled-link block rounded bg-gray-500 px-3 py-2 text-white"
											: "block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
									}
								>
									Register
								</NavLink>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default UserNavbar;
