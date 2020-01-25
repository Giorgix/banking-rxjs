import React, {useEffect, useState} from 'react';
import { withdraw, deposit } from '../../actions';
/**
 * Creates a simple function component to operate with products
 * @param {Object} props
 */
export default function ProductOperations (props) {

  const [fromSelected, setFromselected] = useState('');
  const [toSelected, setToselected] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const accountOptionsFiltered = (selected = fromSelected) =>
    props.accounts.filter(account => parseInt(account.id) !== parseInt(selected)).map(account => {
    return (
      <option key={account.id} value={account.id}>{account.alias}</option>
    )
  });

  const transfer = () => {
    props.dispatch(withdraw(
      {
        amount: parseFloat(transferAmount),
        accountId: fromSelected
      }
    ));
    props.dispatch(deposit(
      {
        amount: parseFloat(transferAmount),
        accountId: toSelected
      }
    ));
  }

  return(
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="col s12 m6 input-field">
            <select className="browser-default" value={fromSelected}
              onChange={(e) => {
                setFromselected(e.target.value);
              }}
            >
              <option value="" disabled>Choose origin</option>
              {accountOptionsFiltered(toSelected)}
            </select>
          </div>
          <div className="col s12 m6 input-field">
            <select className="browser-default" value={toSelected}
              onChange={(e) => {
                setToselected(e.target.value);
              }}
            >
              <option value="" disabled>Choose destination</option>
              {accountOptionsFiltered(fromSelected)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <input placeholder="25" id="transfer_amount" value={transferAmount} type="number" className="validate" onChange={(e) => setTransferAmount(e.target.value)} />
            <label htmlFor="transfer_amount">Amount</label>
          </div>
          <div className="col s12 center-align">
            <button className="waves-effect waves-light btn" onClick={transfer}>
              <i className="material-icons right">add</i>Transfer ${transferAmount} from {fromSelected} to {toSelected}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}