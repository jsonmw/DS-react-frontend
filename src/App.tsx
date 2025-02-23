import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </>
  );
}

export default App;
