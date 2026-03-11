"use client";
import React, { useContext, useMemo } from "react";
import { GlobalContext } from "../Context/globalContext";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const { transactions, loading } = useContext(GlobalContext);

  const expenseByCategory = useMemo(() => {
    const categoryTotals = {};
    
    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        const cat = transaction.category || "Other";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + transaction.amount;
      }
    });

    return categoryTotals;
  }, [transactions]);

  const incomeVsExpense = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    return { income: totalIncome, expense: totalExpense };
  }, [transactions]);

  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expense by Category',
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [incomeVsExpense.income, incomeVsExpense.expense],
        backgroundColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading || transactions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h5 className="text-center fw-semibold mb-3">Analytics</h5>
      
      <div className="row g-3">
        <div className="col-md-6">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6 className="text-center mb-3">Expense by Category</h6>
            {Object.keys(expenseByCategory).length > 0 ? (
              <Pie data={pieData} options={chartOptions} />
            ) : (
              <p className="text-center text-muted">No expense data</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6 className="text-center mb-3">Income vs Expense</h6>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
