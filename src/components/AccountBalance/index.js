import React from 'react';
import { withdraw, deposit } from '../../actions';
/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance ({alias, balances, id, dispatch, onChange}) {
  return(
    <div className="col s12 m6 center-align">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h3>{alias}</h3>
            {balances.map((balance, index) => <h4 key={index}>{balance.amount.toFixed(2)} USD {balance.type.toLowerCase()}</h4>)}
          </div>
          <div className="card-action">
          <a
            className="waves-effect waves-light btn-small"
            onClick={() => dispatch({type: 'REQUEST_ACCOUNT', accountId: id})}
          >
            <i className="material-icons left">autorenew</i>Update
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}