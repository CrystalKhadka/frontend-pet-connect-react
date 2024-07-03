import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId="130561327826-01475pj4hnuclmso7e101jeta4cu6757.apps.googleusercontent.com">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</GoogleOAuthProvider>,
);
