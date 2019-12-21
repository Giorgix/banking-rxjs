import React from 'react';
import { timer, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import Balances from './components/Balances';
import logo from './logo.svg';
import './App.css';

// Updates checking every second
const checking$ = timer(0, 1000);

// Updates savings every 5 seconds
const savings$ = timer(0, 1000 * 5);

// Combines the two inputs into a single stream
// combineLatest -> Combines multiple Observables to create an Observable whose values
// are calculated from the latest values of each of its input Observables.
const balance$ = combineLatest(checking$, savings$).pipe(tap(console.log));

const App = props => {
  // Renders the balances component to the DOM and passes the balance$ stream
  // as props to populate the UI with the illusion of constant cash flow into both accounts
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Balances balance$={balance$} />
      </header>
    </div>
  );
}

export default App;
