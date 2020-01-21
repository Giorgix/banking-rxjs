import React from 'react';

// Ramda
import { compose, prop, curry, pick } from 'ramda';

// RxJS
import { distinctUntilChanged, filter } from 'rxjs/operators';

// Components
//import Balances from './components/Balances';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';
import AccountBalance from './components/AccountBalance';
import ProductOperations from './components/ProductOperations';

// Redux
import configureStore from './redux-store/store.js';

// Firebase
import { authState } from 'rxfire/auth';
import {firebaseApp} from './firebase';

// Utils
import createStreamFromStore from './utils/createStreamFromStore';

// HOC
import {branch, withStoreState, toList, withDispatcher, withUserState} from './hoc';

// Assets
import logo from './logo.svg';
import './App.css';

//initFirebase();
firebaseApp.auth().signInWithEmailAndPassword('jorgemdramos@gmail.com', '11223344').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('AUTH ERROR! ', errorCode, errorMessage)
  // ...
});

//writeUserData('eop5emva3sfKnewQdYuIXvZ99G13', 'Paco', 'email@email.com', 'img.jpg');

const store = configureStore();
const store$ = createStreamFromStore(store);
store.dispatch({type: 'REQUEST_ACCOUNTS'});

// AUTH
const authObservable$ = authState(firebaseApp.auth())

const withPickedProps = curry((propsToPick, BaseComponent) => props => {
  const newProps = pick(propsToPick, props);
  return <BaseComponent {...newProps} />;
})

const enhaceAccount = compose(
  withStoreState(store$, [distinctUntilChanged('accounts')]),
  withDispatcher(store.dispatch),
  withUserState(authObservable$),
  withPickedProps(['accounts', 'isFetching', 'dispatch', 'lastUpdated', 'user']),
  branch(prop('isFetching'), Spinner),
  toList({className: 'accounts-list row'}),
);

const enhaceOperations = compose(
  withStoreState(store$, [distinctUntilChanged('accounts')]),
  withDispatcher(store.dispatch),
  withPickedProps(['accounts', 'isFetching', 'dispatch', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

const enhaceTransactions = compose(
  withStoreState(store$, [distinctUntilChanged('transactions')]),
  withDispatcher(store.dispatch),
  withPickedProps(['transactions', 'isFetching', 'dispatch', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

//const BalancesOrSpinner = branch(prop('isFetching'), Spinner, Balances);
//const WithStoreState = withStoreState(store$, BalancesOrSpinner);
const Accounts = enhaceAccount(AccountBalance);
const Operations = enhaceOperations(ProductOperations)
const TransactionsEnhace = enhaceTransactions(Transactions);
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
        <div className="row">
          <Operations />
        </div>
        <div className="container">
          <TransactionsEnhace />
        </div>
      </main>
    </div>
  );
}

export default App;
