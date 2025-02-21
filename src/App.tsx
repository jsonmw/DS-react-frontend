import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Welcome from "./pages/welcome/Welcome";
import Footer from "./Components/Footer";
import Login from "./pages/login/Login";
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
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
