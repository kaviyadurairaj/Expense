import "../css/ExpenseList.css"

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h3>Expense History</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.desc} - ₹{expense.amount} paid by {expense.payer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

  