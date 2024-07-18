import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdoptedPets from "./pages/Admin/AdoptedPets/AdoptedPets";
import AdminAdoptionForm from "./pages/Admin/AdoptionFormList/AdminAdoptionFormList";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import MyPetList from "./pages/Admin/MyPet/PetList.jsx/MyPetList";
import UpdatePet from "./pages/Admin/MyPet/UpdatePet/UpdatePet";
import PetApplicationList from "./pages/Admin/PetApplicationList/PetApplicationList";
import AdoptionForm from "./pages/Adoption/AdoptionForm";
import Chat from "./pages/Chat/Chat";
import Favorite from "./pages/Favorite/Favorite";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import PetList from "./pages/User/PetList/PetList";
import AdminRoutes from "./protected/Admin/AdminRoutes";
import UserRoutes from "./protected/User/UserRoutes";
import { ThemeProvider } from "./theme/ThemeContext/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<Router>
				<Navbar />
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot" element={<ForgotPassword />} />
					<Route path="/chat/:id" element={<Chat />} />

					<Route element={<UserRoutes />}>
						<Route path="/user/dashboard" element={<UserDashboard />} />
						<Route path="/user/pet/list" element={<PetList />} />
						<Route path="/user/adoption/form/:id" element={<AdoptionForm />} />
						{/* Favorite  */}
						<Route path="/user/favorite" element={<Favorite />} />
					</Route>

					{/* Owner Routes */}
					<Route element={<AdminRoutes />}>
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/myPet/list" element={<MyPetList />} />
						<Route path="/admin/myPet/edit/:id" element={<UpdatePet />} />
						<Route
							path="/admin/adoption/form/:id"
							element={<AdminAdoptionForm />}
						/>
						<Route path="/pet/applications" element={<PetApplicationList />} />
						<Route path="/pet/adopted" element={<AdoptedPets />} />
					</Route>
				</Routes>
				<Footer />
			</Router>
		</ThemeProvider>
	);
}

export default App;
