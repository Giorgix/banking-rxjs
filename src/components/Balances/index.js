import React, {useState, useEffect} from 'react';
import AccountBalance from '../AccountBalance';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

// Creates a composite class for both accounts
export default function Balances (props) {
  const [checking, setChecking] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    props.appState$.pipe(
      distinctUntilChanged('accounts'),
      pluck('accounts'),
    ).subscribe(({checking, savings}) => {
      setChecking(checking);
      setSavings(savings);
    });
  });

  function onChange(e) {
    console.log('change input... ', e.target.value);
  }

  // Renders the component as the composition of two subcomponents
  return(
    <div className="account-info row">
      <AccountBalance onChange={onChange} {...props} name="Checking" value={checking} />
      <AccountBalance onChange={onChange} {...props} name="Savings" value={savings} />
    </div>
  )
}