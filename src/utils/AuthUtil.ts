import { AuthResponse } from "../model/AuthResponse";

class AuthUtil {
  static getLoggedInUser(): string | null {
    try {
      const authObject = localStorage.getItem("user");
      if (!authObject) return null;

      const parsedData = JSON.parse(authObject) as AuthResponse;
      return parsedData?.email || null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
}

export default AuthUtil;
