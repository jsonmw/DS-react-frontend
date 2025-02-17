import { BrowserRouter, Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Welcome from "./pages/Welcome";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Welcome />
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
