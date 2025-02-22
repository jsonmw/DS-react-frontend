import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./pages/welcome/Welcome";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
Navigate
function App() {
  const isAuthenticated = false;

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={!isAuthenticated ? <Welcome /> : <Navigate to="/"/>} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/"/>} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/"/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
