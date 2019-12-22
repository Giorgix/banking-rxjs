import React from 'react';
import withdraw from '../../actions/withdraw';
/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance (props) {
  return(
    <>
      <p>{props.name}: {props.value.toFixed(2)} USD</p>
      <button
        onClick={() =>
          props.dispatch(withdraw(
            {
              amount: 10,
              account: props.name.toLowerCase()
            }
          ))
        }
      >Take out $10 from {props.name}</button>
    </>
  );
}