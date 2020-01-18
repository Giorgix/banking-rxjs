import React from 'react';
import AccountBalance from '../AccountBalance';

// Creates a composite class for both accounts
export default function Balances (props) {

  function onChange(e) {
    console.log('change input... ', e.target.value);
  }

  function renderAccounts() {
    console.log('balances props: ', props);
    return props.accounts.map((account, index) => {
      return (
        <AccountBalance key={String(index)} {...props} onChange={onChange} name={account.alias} value={account.balance} />
      )
    })
  }

  // Renders the component as the composition of two subcomponents
  return(
    renderAccounts()
  )
}