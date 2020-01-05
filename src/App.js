import React from 'react';

// Ramda
import { compose, prop } from 'ramda';

// Components
import Balances from './components/Balances';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';

// Redux
import configureStore from './redux-store/store.js';
import {withdraw, fetchAccounts} from './actions';

// Utils
import createStreamFromStore from './utils/createStreamFromStore';

// HOC
import {branch, fetch, withStoreState} from './hoc';

// Assets
import logo from './logo.svg';
import './App.css';

const store = configureStore();
const store$ = createStreamFromStore(store);
store.dispatch(fetchAccounts());
const action = withdraw({amount: 20, account: 'checking'});
//store.dispatch(action);

const parseResponse = data => ({
  ...data,
})

const enhace = compose(
  withStoreState(store$, store.dispatch),
  branch(prop('isFetching'), Spinner),
);

//const BalancesOrSpinner = branch(prop('isFetching'), Spinner, Balances);
//const WithStoreState = withStoreState(store$, BalancesOrSpinner);
const Accounts = enhace(Balances);

const App = props => {
  // Renders the balances component to the DOM and passes the balance$ stream
  // as props to populate the UI with the illusion of constant cash flow into both accounts
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Accounts />
        <div className="container">
          <Transactions appState$={store$} dispatch={store.dispatch}/>
        </div>
      </main>
    </div>
  );
}

export default App;
