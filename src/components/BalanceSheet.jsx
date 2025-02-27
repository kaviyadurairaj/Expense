import "../css/BalanceSheet.css";

const BalanceSheet = ({ expenses, members }) => {
  const balances = members.reduce((acc, member) => {
    acc[member] = 0;
    return acc;
  }, {});

  expenses.forEach(({ amount, payer }) => {
    const share = amount / members.length;
    members.forEach((member) => {
      if (member === payer) balances[member] += amount - share;
      else balances[member] -= share;
    });
  });

  return (
    <div className="balance-sheet">
      <h3>Balances</h3>
      <ul>
        {Object.entries(balances).map(([member, balance]) => (
          <li key={member}>
            {member}: ₹{balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BalanceSheet;