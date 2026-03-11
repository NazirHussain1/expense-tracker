# Expense Tracker

A full-featured expense tracking application built with Next.js, React, and MongoDB. Track your income and expenses with categories, view analytics with charts, and manage your financial data efficiently.

## Features

- Add income and expense transactions with categories
- View current balance in real-time
- Track total income and expenses separately
- Transaction categories (Food, Transport, Shopping, Bills, Salary, Other)
- Date tracking for all transactions
- Visual analytics with Chart.js:
  - Pie chart showing expense breakdown by category
  - Bar chart comparing income vs expense
- Transaction history with delete functionality
- Clean and responsive UI using Bootstrap 5
- MongoDB Atlas integration for data persistence
- Input validation for amounts and required fields

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Bootstrap 5
- MongoDB Atlas
- Chart.js & react-chartjs-2
- React Context API for state management

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account (free tier available)

### Installation

1. Install the dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory:

```bash
MONGODB_URI=your_mongodb_connection_string_here
```

3. Run the development server:

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
├── api/
│   └── transactions/
│       ├── route.js         # GET & POST transactions
│       └── [id]/route.js    # DELETE transaction
├── components/
│   ├── AddNew/              # Add transaction form with category
│   ├── Balance/             # Current balance display
│   ├── Charts/              # Analytics charts (Pie & Bar)
│   ├── Context/             # Global state management
│   ├── ExpenceIncome/       # Income/Expense summary
│   ├── Header/              # App header
│   └── TransactionHistory/  # Transaction list with dates
├── layout.js                # Root layout with Bootstrap
└── page.js                  # Main page component
lib/
└── mongodb.js               # MongoDB connection handler
```

## How to Use

1. Enter a transaction description
2. Enter the amount (positive numbers only)
3. Select a category from the dropdown
4. Click "Income" to add income or "Expense" to add an expense
5. View your updated balance and analytics charts
6. See transaction history with categories and dates
7. Click the × button to remove any transaction

## Database Schema

Each transaction contains:
- `_id` - MongoDB ObjectId
- `title` - Transaction description
- `amount` - Transaction amount (number)
- `type` - "income" or "expense"
- `category` - Selected category
- `createdAt` - Timestamp

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the `MONGODB_URI` environment variable in Vercel project settings
4. Deploy

The application will automatically create the database and collection on first use.

## Author

Created by NazirHussain
