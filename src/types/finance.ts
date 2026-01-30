export interface Salaries {
  user: number;
  spouse: number;
}

export interface Debt {
  id: string;
  description: string;
  value: number;
  category?: string;
  createdAt: string;
}

export interface Savings {
  total: number;
  transactions: SavingsTransaction[];
}

export interface SavingsTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  value: number;
  createdAt: string;
}

export interface FinancialData {
  salaries: Salaries;
  debts: Debt[];
  savings: Savings;
}

export const defaultFinancialData: FinancialData = {
  salaries: {
    user: 0,
    spouse: 0,
  },
  debts: [],
  savings: {
    total: 0,
    transactions: [],
  },
};
