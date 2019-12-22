import React from 'react';

// RxJS
import { timer, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

// Components
import Balances from './components/Balances';

// Redux
import configureStore from './redux-store/store.js';
import withdraw from './actions/withdraw.js';

// Utils
import createStreamFromStore from './utils/createStreamFromStore';

// Assets
import logo from './logo.svg';
import './App.css';

const store = configureStore();
const store$ = createStreamFromStore(store);
const action = withdraw({amount: 20, account: 'checking'});
store.dispatch(action);

const App = props => {
  // Renders the balances component to the DOM and passes the balance$ stream
  // as props to populate the UI with the illusion of constant cash flow into both accounts
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Balances appState$={store$} dispatch={store.dispatch}/>
      </header>
    </div>
  );
}

export default App;
