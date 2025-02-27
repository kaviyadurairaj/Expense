import { useState } from "react";
import "../css/ExpenseForm.css";

const ExpenseForm = ({ addExpense, members }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount || !payer) return;
    
    addExpense({ desc, amount: parseFloat(amount), payer });
    setDesc("");
    setAmount("");
    setPayer("");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Expense Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="">Select Payer</option>
        {members.map((member, index) => (
          <option key={index} value={member}>{member}</option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
