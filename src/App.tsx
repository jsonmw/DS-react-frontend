import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
Navigate
function App() {
  const isAuthenticated = false;

  return (
    <>
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
    </>
  );
}

export default App;
