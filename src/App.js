import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<div>Login</div>} />
      </Routes>
    </Router>
  );
}

export default App;
