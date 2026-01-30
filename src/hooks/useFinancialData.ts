import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FinancialData,
  defaultFinancialData,
  Debt,
  SavingsTransaction,
} from "@/types/finance";

const DOC_PATH = "financials/shared";

export function useFinancialData() {
  const [data, setData] = useState<FinancialData>(defaultFinancialData);
  const [isLoaded, setIsLoaded] = useState(false);

  const docRef = doc(db, DOC_PATH);

  // 🔹 Load + sync data in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.data() as FinancialData);
      } else {
        // First time: create document
        await setDoc(docRef, defaultFinancialData);
        setData(defaultFinancialData);
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Save helper
  const saveData = async (newData: FinancialData) => {
    setData(newData);
    await setDoc(docRef, newData);
  };

  // Update salaries
  const updateSalaries = useCallback(
    async (userSalary: number, spouseSalary: number) => {
      await saveData({
        ...data,
        salaries: {
          user: userSalary,
          spouse: spouseSalary,
        },
      });
    },
    [data]
  );

  // Add a new debt
  const addDebt = useCallback(
    async (description: string, value: number, category?: string) => {
      const newDebt: Debt = {
        id: crypto.randomUUID(),
        description,
        value,
        category,
        createdAt: new Date().toISOString(),
      };

      await saveData({
        ...data,
        debts: [...data.debts, newDebt],
      });
    },
    [data]
  );

  // Remove a debt
  const removeDebt = useCallback(
    async (id: string) => {
      await saveData({
        ...data,
        debts: data.debts.filter((debt) => debt.id !== id),
      });
    },
    [data]
  );

  // Add to savings
  const addToSavings = useCallback(
    async (value: number) => {
      const transaction: SavingsTransaction = {
        id: crypto.randomUUID(),
        type: "deposit",
        value,
        createdAt: new Date().toISOString(),
      };

      await saveData({
        ...data,
        savings: {
          total: data.savings.total + value,
          transactions: [...data.savings.transactions, transaction],
        },
      });
    },
    [data]
  );

  // Withdraw from savings
  const withdrawFromSavings = useCallback(
    async (value: number) => {
      const transaction: SavingsTransaction = {
        id: crypto.randomUUID(),
        type: "withdrawal",
        value,
        createdAt: new Date().toISOString(),
      };

      await saveData({
        ...data,
        savings: {
          total: Math.max(0, data.savings.total - value),
          transactions: [...data.savings.transactions, transaction],
        },
      });
    },
    [data]
  );

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
