
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSheet from "./components/BalanceSheet";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import logo from "./images/logo1.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      fetchExpenses();
      fetchMembers();
    }
  }, [isLoggedIn]);

  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:5000/api/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  const fetchMembers = async () => {
    const res = await fetch("http://localhost:5000/api/members");
    const data = await res.json();
    setMembers(data);
  };

  //app.jsx
const addExpense = async (expense) => {
  const token = localStorage.getItem("token"); //get token.
  const res = await fetch("http://localhost:5000/api/expense", { //Corrected endpoint.
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` //Added auth header.
    },
    body: JSON.stringify(expense),
  });
  if (res.ok) fetchExpenses();
};

  const deleteExpense = async (id) => {
    const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE"
    });
    if (res.ok) fetchExpenses();
  };

  const addMember = async (member) => {
    const res = await fetch("http://localhost:5000/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: member })
    });
    if (res.ok) fetchMembers();
  };

  const removeMember = async (member) => {
    const res = await fetch(`http://localhost:5000/api/members/${member}`, {
      method: "DELETE"
    });
    if (res.ok) fetchMembers();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Expense Splitter Logo" className="logo" />
          <h1 className="app-title">Expense Splitter</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/expense-form" className="nav-link">Expense Form</Link>
              <Link to="/expense-list" className="nav-link">Expense List</Link>
              <Link to="/balance-sheet" className="nav-link">Balance Sheet</Link>
              <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route 
            path="/expense-form" 
            element={isLoggedIn ? <ExpenseForm addExpense={addExpense} addMember={addMember} removeMember={removeMember} members={members} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/expense-list" 
            element={isLoggedIn ? <ExpenseList expenses={expenses} deleteExpense={deleteExpense} /> : <Navigate to="/login" />} 
          />
          <Route path="/balance-sheet" element={isLoggedIn ? <BalanceSheet expenses={expenses} members={members} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
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