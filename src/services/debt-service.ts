import apiClient from "../config/api-client"
import { Debt } from "../model/Debt"

export const getDebts = () => {
    return apiClient.get<Debt[]>('/debts');
}

export const saveOrUpdateDebt = (debt: Debt) => {
    if(debt.id) {
        return apiClient.put<Debt>(`/debts/${debt.id}`, debt);
    }

    return apiClient.post<Debt>(`/new`, debt);
}

export const getDebtByDebtId = (id : number) => {
    return apiClient.get<Debt>(`/debts/${id}`);
}

export const deleteDebt = (debt: Debt ) => {
    if(debt) {
        return apiClient.delete<void>(`/debts/${debt.id}`);
    } else {
        throw new Error ("Unable to delete debt.");
    }
}