import apiClient from "../config/api-client"
import { Debt } from "../model/Debt"

export const getDebts = () => {
    console.log("Calling /debts")
    return apiClient.get<Debt[]>('/debts');
}