import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceSheet from "./components/BalanceSheet";
import "./App.css";
import logo from "./images/logo1.png";

const members = ["Alice", "Bob", "Charlie"];

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header Section */}
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Expense Splitter Logo" className="logo" />
            <h1 className="app-title">Expense Splitter</h1>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/expense-form">Add Expense</Link>
            <Link to="/expense-list">Expense List</Link>
            <Link to="/balance-sheet">Balance Sheet</Link>
          </nav>
        </header>

        {/* Main Content with Spacing */}
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/expense-form"
              element={<ExpenseForm members={members} />}
            />
            <Route path="/expense-list" element={<ExpenseList expenses={[]} />} />
            <Route
              path="/balance-sheet"
              element={<BalanceSheet expenses={[]} members={members} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/* Home Page */
const Home = () => (
  <section className="welcome">
    <h2>Welcome to Expense Splitter</h2>
    <p>
      Easily split expenses with friends and keep track of balances effortlessly.
    </p>
  </section>
);

export default App;
