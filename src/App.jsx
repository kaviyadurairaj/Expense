import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSheet from "./components/BalanceSheet";
import "./App.css";

const members = ["Alice", "Bob", "Charlie"];

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="app">
      <h1>💰 Expense Splitter</h1>
      <ExpenseForm addExpense={addExpense} members={members} />
      <ExpenseList expenses={expenses} />
      <BalanceSheet expenses={expenses} members={members} />
    </div>
  );
}

export default App;
