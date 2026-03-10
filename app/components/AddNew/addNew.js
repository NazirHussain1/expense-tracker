"use client";
import React, { useContext } from "react";
import { GlobalContext } from "../Context/globalContext";



const AddNew = () => {
  const { description, setDescription, amount, setAmount, addTransaction } =
    useContext(GlobalContext);

  return (
    <div className="mt-5 p-4 rounded bg-light shadow-sm">
      <h5 className="text-center fw-bold mb-4">Add New Transaction</h5>

      <div className="mb-3">
        <label className="form-label fw-medium">Description</label>
        <input
          type="text"
          placeholder="Detail of Transaction..."
          className="form-control"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-medium">Transaction Amount</label>
        <input
          type="number"
          placeholder="Dollar Value of Transaction..."
          className="form-control"
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
        />
      </div>

      <button
        className="btn btn-success w-100 mt-3 fw-semibold"
        onClick={() => addTransaction("income")}
      >
        Income
      </button>

      <button
        className="btn btn-danger w-100 mt-3 fw-semibold"
        onClick={() => addTransaction("expense")}
      >
        Expense
      </button>
    </div>
  );
};

export default AddNew;
