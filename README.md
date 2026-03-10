# Expense Tracker

A simple and intuitive expense tracking application built with Next.js and React. Track your income and expenses, view your current balance, and manage your transaction history.

## Features

- Add income and expense transactions
- View current balance in real-time
- Track total income and expenses separately
- Transaction history with delete functionality
- Clean and responsive UI using Bootstrap 5
- Input validation for amounts

## Tech Stack

- Next.js 16
- React 19
- Bootstrap 5
- React Context API for state management

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

Note: If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

## Project Structure

```
app/
├── components/
│   ├── AddNew/          # Add transaction form
│   ├── Balance/         # Current balance display
│   ├── Context/         # Global state management
│   ├── ExpenceIncome/   # Income/Expense summary
│   ├── Header/          # App header
│   └── TransactionHistory/  # Transaction list
├── layout.js            # Root layout with Bootstrap
└── page.js              # Main page component
```

## How to Use

1. Enter a transaction description
2. Enter the amount (positive numbers only)
3. Click "Income" to add income or "Expense" to add an expense
4. View your updated balance and transaction history
5. Click the × button to remove any transaction

## Future Improvements

### Recommended Enhancements:

1. **Data Persistence** - Add localStorage or database integration
2. **Categories** - Add transaction categories (Food, Transport, Salary, etc.)
3. **Date Tracking** - Show transaction dates and filter by date range
4. **Charts/Graphs** - Visual representation of spending patterns
5. **Export Data** - Export transactions to CSV or PDF
6. **Search/Filter** - Search transactions by description or filter by type
7. **Edit Transactions** - Allow editing existing transactions
8. **Budget Goals** - Set monthly budget limits with alerts

### Database Options:

For data persistence, you can integrate:

- **localStorage** (Simplest) - Client-side storage, no backend needed
- **MongoDB + Mongoose** - NoSQL database, great for JSON-like data
- **PostgreSQL + Prisma** - Relational database with type-safe ORM
- **Supabase** - PostgreSQL with real-time features and auth
- **Firebase Firestore** - Real-time NoSQL database with easy setup

For a simple expense tracker, localStorage is sufficient. For multi-user or cloud sync, consider Supabase or Firebase.

## Deployment

This project is deployed and live. You can deploy your own version on:

- [Vercel](https://vercel.com) (Recommended for Next.js)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)

## Author

Created by NazirHussain
