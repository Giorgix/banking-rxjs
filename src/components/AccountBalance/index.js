import React from 'react';
import { withdraw, deposit } from '../../actions';
/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance ({alias, balance, id, dispatch, onChange}) {
  return(
    <div className="col s12 m6">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h3>{alias}</h3>
            <h4>{balance.toFixed(2)} USD</h4>
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