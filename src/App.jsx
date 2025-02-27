import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSheet from "./components/BalanceSheet";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import "./App.css";
import logo from "./images/logo1.png";

const members = ["Alice", "Bob", "Charlie"];

function App() {
  const [expenses, setExpenses] = useState([]); // Manage state for expenses

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]); // Update the expenses array
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Expense Splitter Logo" className="logo" />
            <h1 className="app-title">Expense Splitter</h1>
          </div>
          <Navbar />
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expense-form" element={<ExpenseForm addExpense={addExpense} members={members} />} />
            <Route path="/expense-list" element={<ExpenseList expenses={expenses} />} />
            <Route path="/balance-sheet" element={<BalanceSheet expenses={expenses} members={members} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => (
  <section className="welcome">
    <h2>Welcome to Expense Splitter</h2>
    <p>Easily split expenses with friends and keep track of balances effortlessly.</p>
    <div className="auth-buttons">
      <Link to="/login" className="button login-button">Login</Link>
      <Link to="/signup" className="button signup-button">Sign Up</Link>
    </div>
  </section>
);

export default App;
