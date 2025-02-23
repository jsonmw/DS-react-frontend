import apiClient from "../config/api-client";
import { AuthRequest } from "../model/AuthRequest";
import { AuthResponse } from "../model/AuthResponse";
import { UserAccount } from "../model/UserAccount";

export const createUserAccount = (userAccount: UserAccount) => {
  return apiClient.post<UserAccount>("/register", userAccount);
};

export const authenticate = (authRequest: AuthRequest) => {
  return apiClient.post<AuthResponse>("/login", authRequest);
};

export const signout = () => {
  return apiClient.post<void>("/logout");
};
