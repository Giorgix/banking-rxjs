import React from 'react';
import { withdraw, deposit } from '../../actions';
/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance ({alias, balance, dispatch, onChange}) {
  return(
    <div className="col s12 m6">
      <h3>{alias}: {balance.toFixed(2)} USD</h3>
      <div className="input-field">
        <input placeholder="25" name="amount" type="number" className="validate" onChange={onChange} />
        <label for="amount">Amount</label>
      </div>
      <button className="waves-effect waves-light btn"
        onClick={() =>
          dispatch(withdraw(
            {
              amount: 10,
              accountName: alias
            }
          ))
        }
      ><i className="material-icons right">add</i>Take out $10 from {alias}</button>
      <button className="waves-effect waves-light btn"
        onClick={() =>
          dispatch(deposit(
            {
              amount: 10,
              accountName: alias
            }
          ))
        }
      ><i className="material-icons right">add</i>Add $10 to {alias}</button>
    </div>
  );
}