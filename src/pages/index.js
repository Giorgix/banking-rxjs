import React, {useEffect} from 'react';
import Layout from '../components/Layout';

// Ramda
import { compose, prop, curry } from 'ramda';

// Firebase
import {firebaseAuth} from '../firebase';

// Components
import Transactions from '../components/Transactions';
import Spinner from '../components/Spinner';
import AccountBalance from '../components/AccountBalance';
import ProductOperations from '../components/ProductOperations';

// HOC
import {
    branch,
    toList,
    withConnectedProps,
    withConnectedActions
} from '../hoc';


const enhaceAccounts = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  toList({className: 'accounts-list row'}),
);

const enhaceOperations = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

const enhaceTransactions = compose(
  withConnectedProps(['transactions', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
);

const AccountsList = enhaceAccounts(AccountBalance);
const Operations = enhaceOperations(ProductOperations)
const TransactionsEnhace = enhaceTransactions(Transactions);

const Index = ({requestAccounts, startInterest, stopInterest}) => {

  useEffect(() => {
      stopInterest();
      requestAccounts();
      startInterest();
  }, [requestAccounts, startInterest, stopInterest]);

  /*useEffect(() => {
      setTimeout(() => {
          stopInterest();
      }, 8000);
  }, [stopInterest]);*/
  return (
      <Layout>
      <div className="App">
      <main>
        <AccountsList />
        <Operations />
        <div className="container">
          <TransactionsEnhace />
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

  export default withConnectedActions(
    ['requestAccounts', 'startInterest', 'stopInterest'],
  )(Index)

  /*export default connect(null, {
    requestAccounts: requestAccounts,
    startInterest: startInterest,
    stopInterest: stopInterest,
  })(Index)*/