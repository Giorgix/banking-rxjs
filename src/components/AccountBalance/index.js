import React from 'react';

/**
 * Creates a simple  function component that formats its input
 * @param {Object} props
 */
export default function AccountBalance (props) {
  return(
      <p>{props.name}: {props.value} USD</p>
  );
}