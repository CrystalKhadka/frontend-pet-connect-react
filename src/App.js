import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";

function App() {
    

    return (
        <Router>
            <Navbar/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/user/dashboard" element={<UserDashboard/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
