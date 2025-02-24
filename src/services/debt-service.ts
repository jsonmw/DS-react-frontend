import apiClient from "../config/api-client"
import { Debt } from "../model/Debt"

export const getDebts = () => {
    return apiClient.get<Debt[]>('/debts');
}

export const saveOrUpdateDebt = (debt: Debt) => {
    if(debt.id !== undefined || debt.id !== null) {
        return apiClient.put<Debt>(`/debts/${debt.id}`, debt);
    }

    return apiClient.post<Debt>(`/new`, debt);
}