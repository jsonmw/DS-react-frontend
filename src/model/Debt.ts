export interface Debt {
    id?: number;
    name: string;
    debtType: string;
    apr: number;
    balance: number;
    description: string;
    cardType?: string,
    loanTerms?: string,
    createdAt?: string,
    updatedAt?: string
}