"use client";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  const addTransaction = (type) => {
    if (!description || !amount) return;

    const value = Number(amount);

    if (type === "income") {
      setIncome(income + value);
      setBalance(balance + value);
    } else {
      setExpense(expense + value);
      setBalance(balance - value);
    }

    setTransactions([
      ...transactions,
      { id: Date.now(), description, amount: value, type },
    ]);

    setDescription("");
    setAmount("");
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        description,
        setDescription,
        amount,
        setAmount,
        transactions,
        addTransaction,
        removeTransaction,
        balance,
        income,
        expense,
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
