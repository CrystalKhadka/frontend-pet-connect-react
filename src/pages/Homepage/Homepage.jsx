import React from "react";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import UserDashboard from "../User/Dashboard/UserDashboard";

const Homepage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <div>
            This is homepage
        </div>;
    } else if (user.role === "owner") {
        return <AdminDashboard/>
    } else if (user.role === "adopter") {
        return <UserDashboard/>
    }
};

export default Homepage;
