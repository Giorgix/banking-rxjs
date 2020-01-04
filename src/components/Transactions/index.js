import React, { useState, useEffect } from 'react';
//import Transaction from '../Transaction';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Creates a function component to hold the transactions state from the redux store
const Transactions = props => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Subscribes to updates on the balances
    props.appState$.pipe(
      distinctUntilChanged('transactions'),
      pluck('transactions'),
    ).subscribe(setTransactions);
  })

  function isWithdraw(transaction) {
    return transaction.type === 'WITHDRAW';
  }

  function parseAmount(transaction) {
    return isWithdraw(transaction) ? '-' + transaction.amount.toFixed(2) : '+' + transaction.amount.toFixed(2);
  }

  function renderItems() {
    return transactions.map((transaction, index) => {
      return (
        <tr key={transaction.timestamp}>
          <td>{index + 1}</td>
          <td className="valign-wrapper"><strong>{transaction.type}</strong> {isWithdraw(transaction)
            ? <i className="material-icons red-text text-darken-4">arrow_back</i>
            : <i className="material-icons green-text">arrow_forward</i>}</td>
          <td>{new Date(transaction.timestamp).toLocaleString('es-es')}</td>
          <td>{transaction.account}</td>
          <td><strong>{parseAmount(transaction)}</strong></td>
          <td>{transaction.balance.toFixed(2)}</td>
        </tr>
      );
    })
  }

  // Renders the component as the composition of two subcomponents
  return(
    <table className="responsive-table striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>Date</th>
        <th>Account</th>
        <th>Amount</th>
        <th>Current Balance</th>
      </tr>
    </thead>
    <tbody>
      {renderItems()}
    </tbody>
    </table>
  )
};

export default Transactions;