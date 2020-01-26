import React, {useEffect} from 'react';
import Layout from '../components/Layout';

// Ramda
import { compose, prop, curry } from 'ramda';


// Components
import Transactions from '../components/Transactions';
import Spinner from '../components/Spinner';
import AccountBalance from '../components/AccountBalance';
import ProductOperations from '../components/ProductOperations';


// Firebase
import { authState } from 'rxfire/auth';
import {firebaseAuth} from '../firebase';

// Redux
import { connect } from 'react-redux'
import {requestAccounts, startInterest, stopInterest} from '../actions'

// HOC
import {
    branch,
    toList,
    withUserState
} from '../hoc';

firebaseAuth.signInWithEmailAndPassword('jorgemdramos@gmail.com', '11223344').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('AUTH ERROR! ', errorCode, errorMessage)
  // ...
});

const withConnectedProps = curry((connect, propsToConnect) => {
    return connect(state => propsToConnect.reduce((acc, curr) => {
        return {...acc, [curr]: state[curr]}
    }, {}))
})

const enhaceAccount = compose(
  withConnectedProps(connect, ['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  toList({className: 'accounts-list row'}),
);

const enhaceOperations = compose(
  withConnectedProps(connect, ['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

const enhaceTransactions = compose(
  withConnectedProps(connect, ['transactions', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

const Accounts = enhaceAccount(AccountBalance);
const Operations = enhaceOperations(ProductOperations)
const TransactionsEnhace = enhaceTransactions(Transactions);

const Index = ({requestAccounts, startInterest, stopInterest}) => {

  useEffect(() => {
      requestAccounts();
      startInterest();
  }, [requestAccounts, startInterest]);

  /*useEffect(() => {
      setTimeout(() => {
          stopInterest();
      }, 8000);
  }, [stopInterest]);*/
  return (
      <Layout>
      <div className="App">
      <main>
        <Accounts isFetching={true}/>
        <Operations isFetching={true} />
        <div className="container">
          <TransactionsEnhace isFetching={true} />
        </div>
      </main>
    </div>
  </Layout>
  )
};

Index.getInitialProps = async ({ store, isServer }) => {

    /*const state$ = new StateObservable(new Subject(), store.getState())
    const resultAction = await rootEpic(
      of({type: 'REQUEST_ACCOUNTS'}),
      state$
    ).toPromise() // we need to convert Observable to Promise
    console.log('result action: ', resultAction);*/
    

    return { isServer }
  }

  export default connect(null, {
    requestAccounts: requestAccounts,
    startInterest: startInterest,
    stopInterest: stopInterest,
  })(Index)