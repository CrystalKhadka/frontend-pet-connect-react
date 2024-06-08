import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
	const user = JSON.parse(localStorage.getItem("user")) || {
		firstName: "User",
	};
	const activeLinkClass = ({ isActive }) =>
		isActive
			? "block rounded bg-gray-700 px-4 py-2 disabled-link"
			: "block rounded px-4 py-2 hover:bg-gray-700";

	return (
		<div className="sidebar">
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="h-6 w-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
			<aside
				id="sidebar-multi-level-sidebar"
				className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full w-64 bg-gray-800 text-white">
					<div className="flex h-full flex-col justify-between p-6">
						<h1 className="mb-6 text-center text-2xl font-semibold">
							Pet Owner Dashboard
						</h1>
						<div className="flex flex-col space-y-4">
							<NavLink to="/admin/dashboard" className={activeLinkClass}>
								Dashboard
							</NavLink>
							<NavLink to="/admin/myPet/list" className={activeLinkClass}>
								Pet Profile Management
							</NavLink>
							<NavLink to="/pet/adopted" className={activeLinkClass}>
								Adopted Pets
							</NavLink>
							<NavLink to="/pet/applications" className={activeLinkClass}>
								Adoption Applications
							</NavLink>
							<NavLink to="/chat" className={activeLinkClass}>
								Messaging
							</NavLink>
						</div>
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
									</li>
									<li>
										<NavLink
											to="/settings"
											className={({ isActive }) =>
												isActive
													? "block bg-gray-100 px-4 py-2"
													: "block px-4 py-2 hover:bg-gray-100"
											}
										>
											Settings
										</NavLink>
									</li>
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
					</div>
				</div>
			</aside>
		</div>
	);
};

export default AdminNavbar;
