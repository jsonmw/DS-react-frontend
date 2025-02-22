import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
Navigate
function App() {
  const isAuthenticated = false;

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
