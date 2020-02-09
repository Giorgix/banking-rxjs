import React, {useEffect} from 'react';
import Layout from '../components/Layout';

// Ramda
import { compose, prop, isEmpty } from 'ramda';

// Components
import Transactions from '../components/Transactions';
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';
import AccountBalance from '../components/AccountBalance';
import ProductOperations from '../components/ProductOperations';

// HOC
import {
    branch,
    toList,
    withConnectedProps,
    withConnectedActions,
    withAuthentication
} from '../hoc';


const enhaceAccounts = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({accounts, isFetching}) => !isFetching && isEmpty(accounts), NotFound),
  toList({className: 'accounts-list row'}),
);

const enhaceOperations = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({accounts, isFetching}) => !isFetching && isEmpty(accounts), NotFound),
);

const enhaceTransactions = compose(
  withConnectedProps(['transactions', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({transactions, isFetching}) => !isFetching && isEmpty(transactions), NotFound),
);

const AccountsList = enhaceAccounts(AccountBalance);
const Operations = enhaceOperations(ProductOperations)
const TransactionsEnhace = enhaceTransactions(Transactions);

const Index = ({isServer, requestAccounts, startInterest, stopInterest, initApp}) => {

  useEffect(() => {
      stopInterest();
      requestAccounts();
      startInterest();
      initApp();
  }, [requestAccounts, startInterest, stopInterest, initApp]);

  return (
    <Layout>
      <main>
        <AccountsList />
        <Operations />
        <div className="container">
          <TransactionsEnhace />
        </div>
      </main>
    </Layout>
  )
};

const enhace = compose(
  withConnectedActions(['requestAccounts', 'startInterest', 'stopInterest', 'initApp']),
  withAuthentication
)

const enhaceIndex = enhace(Index);
enhaceIndex.getInitialProps = async ({isServer, pathname, query}) => {
  return { isServer };
}

export default enhaceIndex;