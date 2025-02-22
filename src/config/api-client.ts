import axios from "axios";
import { AuthResponse } from "../model/AuthResponse";

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1"; TODO: fix env variable later
const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Helper function to get active JWT if any
const getAuthToken = (): string | null => {
  const authObject = localStorage.getItem("user");
  if (!authObject) return null;

  console.log(authObject);

  try {
    const { token } = JSON.parse(authObject) as AuthResponse;
    return token;
  } catch (error) {
    console.error("Failed to parse auth object from localStorage", error);
    return null;
  }
};

// Request Interceptor: Attach token to requests except auth endpoints
apiClient.interceptors.request.use(
  (config) => {
    const isAuthRequest =
      config.url?.includes("/login") || config.url?.includes("/register");
    if (!isAuthRequest) {
      const token = getAuthToken();
      console.log("Attempting a request with token: ", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;  
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized by logging out and clearing token
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
