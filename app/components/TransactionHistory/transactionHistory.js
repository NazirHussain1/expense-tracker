"use client";
import React, { useContext } from "react";
import { GlobalContext } from "../Context/globalContext";

import "./transactionHistory.css";

const TransactionHistory = () => {
  const { 
    filteredTransactions, 
    removeTransaction, 
    loading, 
    error,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory
  } = useContext(GlobalContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const categories = ["Food", "Transport", "Shopping", "Bills", "Salary", "Other"];

  return (
    <div className="mt-4">
      <h5 className="text-center fw-semibold mb-3">Transaction History</h5>

      {/* Filter Section */}
      <div className="bg-light p-3 rounded shadow-sm mb-3">
        <div className="row g-2">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-center text-muted">Loading transactions...</p>
      )}

      {!loading && filteredTransactions.length === 0 && (
        <p className="text-center text-muted">No transactions found</p>
      )}

      {!loading && filteredTransactions.map((item) => (
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
