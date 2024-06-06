/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	return user.role === "owner" ? (
		<>
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				class="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>

			<aside
				id="sidebar-multi-level-sidebar"
				class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div class="flex h-full flex-col items-center   overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
					<p
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
						}}
					>
						Pet Owner Dashboard
					</p>
					{/* Sized box */}

					<div class="mt-5 flex h-full flex-col  justify-end font-medium">
						<a
							href="#"
							class="  rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							Dashboard
						</a>

						<a
							href="#"
							class=" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							My pets
						</a>

						<a
							href="#"
							class=" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							Adopted pets
						</a>

						<a
							href="#"
							class=" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							Adoption Forms
						</a>
					</div>
				</div>
			</aside>
		</>
	) : (
		<>
			<nav className="bg-gray-800 text-white ">
				<div className="container  mx-auto flex flex-wrap items-center justify-between p-4">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="./assets/icons/icon.jpg"
							className="h-16"
							alt="App Logo"
						/>
						<span className="self-center whitespace-nowrap text-2xl font-semibold">
							Pet Connect
						</span>
					</Link>

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
						className=" hidden w-full flex-col md:flex md:w-auto md:flex-1 md:flex-row md:justify-between	"
					>
						<div></div>
						<div className="mt-4 flex w-full flex-col p-4 font-medium md:mt-0 md:w-auto  md:flex-row md:p-0">
							<NavLink
								to="/"
								className="block px-3 py-2 text-white hover:bg-gray-700 active:bg-gray-200 md:p-2 md:hover:text-white md:active:bg-gray-900"
							>
								Home
							</NavLink>

							<NavLink
								to="/pet/list"
								className="block px-3 py-2 text-white hover:bg-gray-700 md:p-2 md:hover:text-white"
							>
								Pet List
							</NavLink>
							<NavLink
								to="/pet/list"
								className="block px-3 py-2 text-white hover:bg-gray-700 md:p-2 md:hover:text-white"
							>
								Pet List
							</NavLink>
							<NavLink
								to="/favorite"
								className="block px-3 py-2	
			  text-white hover:bg-gray-700 md:p-2 md:hover:text-white"
							>
								Favorite
							</NavLink>
						</div>
						{/* User Dropdown */}
						<div className="flex w-full justify-start md:w-auto ">
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
												<Link
													to="/profile"
													className="block px-4 py-2 hover:bg-gray-100"
												>
													Profile
												</Link>
											</li>
											<li>
												<Link
													to="/my-pets"
													className="block px-4 py-2 hover:bg-gray-100"
												>
													My Pets
												</Link>
											</li>
											<li>
												<Link
													to="/settings"
													className="block px-4 py-2 hover:bg-gray-100"
												>
													Settings
												</Link>
											</li>
										</ul>
										<div className="py-1">
											<a
												onClick={() => {
													localStorage.removeItem("user");
													localStorage.removeItem("token");
													window.location.href = "/";
												}}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Sign out
											</a>
										</div>
									</div>
								</div>
							) : (
								<>
									<div className="flex space-x-2">
										<Link
											to="/login"
											className="block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
										>
											Login
										</Link>
										<Link
											to="/register"
											className="block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
										>
											Register
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
