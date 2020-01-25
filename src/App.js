import React from 'react';

// Ramda
import { compose, prop } from 'ramda';

// RxJS
import { distinctUntilChanged, filter } from 'rxjs/operators';

// Components
//import Balances from './components/Balances';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';
import AccountBalance from './components/AccountBalance';
import ProductOperations from './components/ProductOperations';
import NavBar from './components/NavBar';

// Redux
import configureStore from './redux-store/store.js';

// Firebase
import { authState } from 'rxfire/auth';
import {firebaseAuth} from './firebase';

// Utils
import createStreamFromStore from './utils/createStreamFromStore';

// HOC
import {
  branch,
  withStoreState,
  toList,
  withDispatcher,
  withPickedProps,
  withUserState
} from './hoc';

// Assets
import './App.css';

//initFirebase();

//writeUserData('eop5emva3sfKnewQdYuIXvZ99G13', 'Paco', 'email@email.com', 'img.jpg');

firebaseAuth.signInWithEmailAndPassword('jorgemdramos@gmail.com', '11223344').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('AUTH ERROR! ', errorCode, errorMessage)
  // ...
});
const store = configureStore();
const store$ = createStreamFromStore(store);
store.dispatch({type: 'REQUEST_ACCOUNTS'});

// AUTH
const authObservable$ = authState(firebaseAuth)

const enhaceAccount = compose(
  withStoreState(store$, [distinctUntilChanged('accounts')]),
  withDispatcher(store.dispatch),
  withPickedProps(['accounts', 'isFetching', 'dispatch', 'lastUpdated']),
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

const enchaceNavBar = compose(
  withUserState(authObservable$),
  withDispatcher(store.dispatch),
  withPickedProps(['dispatch', 'user']),
);

const Navigation = enchaceNavBar(NavBar);
const Accounts = enhaceAccount(AccountBalance);
const Operations = enhaceOperations(ProductOperations)
const TransactionsEnhace = enhaceTransactions(Transactions);

const App = props => {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Accounts />
        <Operations />
        <div className="container">
          <TransactionsEnhace />
        </div>
      </main>
    </div>
  );
}

export default App;
