import { useState } from "react";
import "../css/BalanceSheet.css";

const BalanceSheet = ({ expenses, setExpenses, members }) => {
  const [settlements, setSettlements] = useState([]);

  const calculateBalances = () => {
    const balances = members.reduce((acc, member) => {
      acc[member] = 0;
      return acc;
    }, {});

    expenses.forEach(({ amount, payer, splitType, percentages }) => {
      if (splitType === "equal") {
        const share = amount / members.length;
        members.forEach((member) => {
          if (member === payer) balances[member] += amount - share * (members.length - 1);
          else balances[member] -= share;
        });
      }
       else if (splitType === "percentage") {
        members.forEach((member) => {
          const memberShare = (amount * (percentages[member] || 0)) / 100;
          if (member === payer) balances[member] += amount - memberShare;
          else balances[member] -= memberShare;
        });
      }
    });

    return balances;
  };

  const getSimplifiedDebts = (balances) => {
    const simplified = [];
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([member, balance]) => {
      if (balance > 0) creditors.push({ member, amount: balance });
      else if (balance < 0) debtors.push({ member, amount: -balance });
    });

    while (creditors.length && debtors.length) {
      const creditor = creditors[0];
      const debtor = debtors[0];

      const settledAmount = Math.min(creditor.amount, debtor.amount);
      simplified.push(`${debtor.member} → ${creditor.member}: ₹${settledAmount.toFixed(2)}`);

      creditor.amount -= settledAmount;
      debtor.amount -= settledAmount;

      if (creditor.amount === 0) creditors.shift();
      if (debtor.amount === 0) debtors.shift();
    }

    return simplified;
  };

  const handleSettleUp = () => {
    const balances = calculateBalances();
    const debts = getSimplifiedDebts(balances);

    setSettlements((prev) => [...prev, { date: new Date(), debts }]);
    setExpenses([]); // Clear all expenses after settling up
  };

  const balances = calculateBalances();

  return (
    <div className="balance-sheet">
      <h3>Balances</h3>
      <ul>
        {Object.entries(balances).map(([member, balance]) => (
          <li key={member} className={balance >= 0 ? "positive" : "negative"}>
            {member}: ₹{balance.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Simplified Debts</h3>
      <ul>
        {getSimplifiedDebts(balances).map((debt, index) => (
          <li key={index}>{debt}</li>
        ))}
      </ul>

      <button onClick={handleSettleUp}>Settle Up</button>

      {settlements.length > 0 && (
        <div className="settlement-history">
          <h3>Settlement History</h3>
          {settlements.map((settlement, index) => (
            <div key={index}>
              <h4>{settlement.date.toLocaleString()}</h4>
              <ul>
                {settlement.debts.map((debt, i) => (
                  <li key={i}>{debt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
