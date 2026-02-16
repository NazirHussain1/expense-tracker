import Header from "./components/Header/header";
import Balance from "./components/Balance/balance";
import ExpenceIncome from "./components/ExpenceIncome/expenceIncome";
import TransactionHistory from "./components/TransactionHistory/transactionHistory";
import AddNew from "./components/AddNew/addNew";
import { GlobalProvider } from "./components/Context/globalContext";

export default function Home() {
  return (
    <div className="container mt-4">
      <div className="mx-auto w-100" style={{ maxWidth: "600px" }}>

        <GlobalProvider>

          <Header />
          <Balance />
          <ExpenceIncome />
          <AddNew />
          <TransactionHistory />
          

        </GlobalProvider>

      </div>
    </div>
  );
}
