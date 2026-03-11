"use client";
import React, { useContext } from "react";
import { GlobalContext } from "../Context/globalContext";

import "./transactionHistory.css";

const TransactionHistory = () => {
  const { transactions, removeTransaction, loading, error } = useContext(GlobalContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="mt-4">
      <h5 className="text-center fw-semibold mb-3">Transaction History</h5>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-center text-muted">Loading transactions...</p>
      )}

      {!loading && transactions.length === 0 && (
        <p className="text-center text-muted">No transactions yet</p>
      )}

      {!loading && transactions.map((item) => (
        <div
          key={item._id}
          className={`container p-2 mt-2 rounded shadow-sm history-item ${
            item.type === "income" ? "bg-income" : "bg-expense"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-medium d-block">{item.title}</span>
              <small className="text-muted">
                {item.category} • {formatDate(item.createdAt)}
              </small>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span
                className={`fw-bold ${
                  item.type === "income" ? "text-success" : "text-danger"
                }`}
              >
                {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
              </span>

              <button className="btn" onClick={() => removeTransaction(item._id)}>
                &times;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
