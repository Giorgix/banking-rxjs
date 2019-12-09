import React from 'react';
import logo from './logo.svg';
import './App.css';

const AccountBalance = props => {
  return(
    <div className="account-info">
      <p>Checking {props.checking}</p>
      <p>Savings {props.savings}</p>
    </div>
  );
}

const App = props => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AccountBalance {...props}/>
      </header>
    </div>
  );
}

export default App;
