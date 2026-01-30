import { useState, useEffect, useCallback } from 'react';
import { FinancialData, defaultFinancialData, Debt, SavingsTransaction } from '@/types/finance';

const STORAGE_KEY = 'financial_data';

export function useFinancialData() {
  const [data, setData] = useState<FinancialData>(defaultFinancialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (error) {
        console.error('Error loading financial data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  // Update salaries
  const updateSalaries = useCallback((userSalary: number, spouseSalary: number) => {
    setData(prev => ({
      ...prev,
      salaries: {
        user: userSalary,
        spouse: spouseSalary,
      },
    }));
  }, []);

  // Add a new debt
  const addDebt = useCallback((description: string, value: number, category?: string) => {
    const newDebt: Debt = {
      id: crypto.randomUUID(),
      description,
      value,
      category,
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      debts: [...prev.debts, newDebt],
    }));
  }, []);

  // Remove a debt
  const removeDebt = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      debts: prev.debts.filter(debt => debt.id !== id),
    }));
  }, []);

  // Add to savings
  const addToSavings = useCallback((value: number) => {
    const transaction: SavingsTransaction = {
      id: crypto.randomUUID(),
      type: 'deposit',
      value,
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      savings: {
        total: prev.savings.total + value,
        transactions: [...prev.savings.transactions, transaction],
      },
    }));
  }, []);

  // Withdraw from savings
  const withdrawFromSavings = useCallback((value: number) => {
    const transaction: SavingsTransaction = {
      id: crypto.randomUUID(),
      type: 'withdrawal',
      value,
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      savings: {
        total: Math.max(0, prev.savings.total - value),
        transactions: [...prev.savings.transactions, transaction],
      },
    }));
  }, []);

  // Calculated values
  const totalSalaries = data.salaries.user + data.salaries.spouse;
  const totalDebts = data.debts.reduce((sum, debt) => sum + debt.value, 0);
  const totalSavings = data.savings.total;
  const balance = totalSalaries - totalDebts + totalSavings;

  return {
    data,
    isLoaded,
    updateSalaries,
    addDebt,
    removeDebt,
    addToSavings,
    withdrawFromSavings,
    totalSalaries,
    totalDebts,
    totalSavings,
    balance,
  };
}
