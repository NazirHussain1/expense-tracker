"use client";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/transactions');
      const result = await response.json();

      if (result.success) {
        setTransactions(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  const addTransaction = async (type) => {
    if (!description.trim() || !amount || !category) return;

    const value = Number(amount);
    if (value <= 0 || isNaN(value)) return;

    try {
      setError(null);
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: description.trim(),
          amount: value,
          type,
          category,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTransactions([result.data, ...transactions]);
        setDescription("");
        setAmount("");
        setCategory("");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to add transaction');
    }
  };

  const removeTransaction = async (id) => {
    try {
      setError(null);
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setTransactions(transactions.filter((t) => t._id !== id));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete transaction');
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        description,
        setDescription,
        amount,
        setAmount,
        category,
        setCategory,
        transactions,
        addTransaction,
        removeTransaction,
        balance,
        income,
        expense,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
