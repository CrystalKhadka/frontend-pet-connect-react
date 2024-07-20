import React from "react";
import { FaEnvelope, FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
	const handleEmailClick = () => {
		navigator.clipboard.writeText("khadkacrystal@gmail.com");
		toast.success("Email copied to clipboard");
	};

	const user = JSON.parse(localStorage.getItem("user"));

	if (user?.role === "owner") {
		return null;
	}

	return (
		<footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-10 text-white">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<img
								src="/path-to-your-logo.png"
								alt="Pet Connect Logo"
								className="h-8 w-8"
							/>
							<h3 className="text-xl font-bold">Pet Connect</h3>
						</div>
						<p className="text-sm text-gray-300">Swipe. Adopt. Love.</p>
						<p className="text-sm text-gray-300">
							&copy; {new Date().getFullYear()} Pet Connect. All rights
							reserved.
						</p>
					</div>

					<div className="space-y-3">
						<h4 className="text-lg font-semibold">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="/pets"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									Find a Pet
								</Link>
							</li>
							<li>
								<Link
									to="/donate"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									Donate
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-3">
						<h4 className="text-lg font-semibold">Legal</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/terms"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/faq"
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-3">
						<h4 className="text-lg font-semibold">Contact Us</h4>
						<button
							onClick={handleEmailClick}
							className="flex items-center space-x-2 text-sm text-gray-300 transition-colors hover:text-white"
						>
							<FaEnvelope />
							<span>khadkacrystal@gmail.com</span>
						</button>
						<div className="flex space-x-4">
							<a
								href="https://www.instagram.com/khadkacrystal/?hl=en"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<FaInstagram className="text-xl" />
							</a>
							<a
								href="https://www.facebook.com/crystal.khadka/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<FaFacebookF className="text-xl" />
							</a>
							<a
								href="https://github.com/CrystalKhadka"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 transition-colors hover:text-white"
							>
								<FaGithub className="text-xl" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
