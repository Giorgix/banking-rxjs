import React from 'react';
//import Transaction from '../Transaction';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Creates a composite class for both accounts
export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount() {

    // Subscribes to updates on the balances
    this.props.appState$.pipe(
      distinctUntilChanged('transactions'),
      pluck('transactions'),
    ).subscribe(transactions => {
      this.setState({transactions})
    });
  }

  isWithdraw(transaction) {
    return transaction.type === 'WITHDRAW';
  }

  parseAmount(transaction) {
    return this.isWithdraw(transaction) ? '-' + transaction.amount.toFixed(2) : '+' + transaction.amount.toFixed(2);
  }

  renderItems() {
    return this.state.transactions.map((transaction, index) => {
      return (
        <tr key={transaction.timestamp}>
          <td>{index + 1}</td>
          <td className="valign-wrapper"><strong>{transaction.type}</strong> {this.isWithdraw(transaction)
            ? <i className="material-icons red-text text-darken-4">arrow_back</i>
            : <i className="material-icons green-text">arrow_forward</i>}</td>
          <td>{new Date(transaction.timestamp).toLocaleString('es-es')}</td>
          <td>{transaction.account}</td>
          <td><strong>{this.parseAmount(transaction)}</strong></td>
          <td>{transaction.balance.toFixed(2)}</td>
        </tr>
      );
    })
  }

  render() {

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
        {this.renderItems()}
      </tbody>
      </table>
    )
  }
}