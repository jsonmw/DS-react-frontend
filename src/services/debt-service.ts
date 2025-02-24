import apiClient from "../config/api-client"
import { Debt } from "../model/Debt"

export const getDebts = () => {
    return apiClient.get<Debt[]>('/debts');
}