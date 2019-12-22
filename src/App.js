import React from 'react';

// RxJS
import { timer, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

// Components
import Balances from './components/Balances';

// Redux
import store from './redux-store/store.js';
import withdraw from './actions/withdraw.js';

// Epics
import transactionLogEpic from './epics/transaction';
import interestEpic from './epics/interestEpic';

// Utils
import createMiddleware from './utils/createMiddleware';
import createStreamFromStore from './utils/createStreamFromStore';

// Assets
import logo from './logo.svg';
import './App.css';


const middleWareEpics = [
  transactionLogEpic,
  interestEpic
];

// Creatres a set of middleware components
const middleware = createMiddleware(store, middleWareEpics);

const state$ = createStreamFromStore(store);

state$.subscribe(console.log);

const action = withdraw({amount: 80, account: 'checking'});

setTimeout(() => {
  console.log('Dispatching...');
  
  middleware.dispatch(action);
}, 4000);



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
        <Balances appState$={state$} dispatch={middleware.dispatch}/>
      </header>
    </div>
  );
}

export default App;
