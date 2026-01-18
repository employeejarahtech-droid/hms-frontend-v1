export interface ChartOfAccount {
    id: number;
    name: string;
    code: string;
    type: string;
    balance?: number;
    description?: string;
    is_active?: boolean;
    parent_id?: number | null;
}

export interface LedgerEntry {
    id: number;
    date: string;
    narration: string;
    debit: number;
    credit: number;
    balance: number;
}

export interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: string; // 'Sales' | 'Purchase' | 'Expense' | 'Income' | 'Journal'
    mode: string; // 'Cash' | 'Bank' | 'Due'
    debit_account?: string;
    credit_account?: string;
    reference?: string;
}

export interface CreateTransactionInput {
    type: 'SALES' | 'PURCHASE' | 'EXPENSE' | 'INCOME' | 'JOURNAL' | undefined;
    amount: number | undefined;
    payment_mode: 'CASH' | 'BANK' | 'DUE' | undefined;
    date: string;
    description: string;
}
