import React from 'react';
import withdraw from '../../actions/withdraw';
/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance (props) {
  return(
    <div className="col s12 m6">
      <h3>{props.name}: {props.value.toFixed(2)} USD</h3>
      <div className="input-field">
        <input placeholder="25" name="amount" type="number" className="validate" onChange={props.onChange} />
        <label for="amount">Amount</label>
      </div>
      <button className="waves-effect waves-light btn"
        onClick={() =>
          props.dispatch(withdraw(
            {
              amount: 10,
              account: props.name.toLowerCase()
            }
          ))
        }
      ><i className="material-icons right">add</i>Take out $10 from {props.name}</button>
    </div>
  );
}