import React from 'react';

// Ramda
import { compose, prop, curry, pick } from 'ramda';

// Components
//import Balances from './components/Balances';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';
import AccountBalance from './components/AccountBalance';

// Redux
import configureStore from './redux-store/store.js';
import {fetchAccounts} from './actions';

// Utils
import createStreamFromStore from './utils/createStreamFromStore';

// HOC
import {branch, withStoreState, toList, withDispatcher} from './hoc';

// Assets
import logo from './logo.svg';
import './App.css';

const store = configureStore();
const store$ = createStreamFromStore(store);
store.dispatch(fetchAccounts());

const withPickedProps = curry((propsToPick, BaseComponent) => props => {
  const newProps = pick(propsToPick, props);
  return <BaseComponent {...newProps} />;
})

const enhace = compose(
  withStoreState(store$),
  withDispatcher(store.dispatch),
  withPickedProps(['accounts', 'isFetching', 'dispatch', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  toList({className: 'accounts-list row'}),
);

//const BalancesOrSpinner = branch(prop('isFetching'), Spinner, Balances);
//const WithStoreState = withStoreState(store$, BalancesOrSpinner);
const Accounts = enhace(AccountBalance);

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
