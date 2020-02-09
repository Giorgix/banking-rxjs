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


const enhanceAccounts = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({accounts, isFetching}) => !isFetching && isEmpty(accounts), NotFound),
  toList({className: 'accounts-list row'}),
);

const enhanceOperations = compose(
  withConnectedProps(['accounts', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({accounts, isFetching}) => !isFetching && isEmpty(accounts), NotFound),
);

const enhanceTransactions = compose(
  withConnectedProps(['transactions', 'isFetching', 'lastUpdated']),
  branch(prop('isFetching'), Spinner),
  branch(({transactions, isFetching}) => !isFetching && isEmpty(transactions), NotFound),
);

const AccountsList = enhanceAccounts(AccountBalance);
const Operations = enhanceOperations(ProductOperations)
const TransactionsEnhance = enhanceTransactions(Transactions);

const IndexNotLogged = props => {
  return(
    <Layout>
      <main>
        <h3>NOT LOGGED</h3>
      </main>
    </Layout>
  )
}

const Index = ({user, requestAccounts, startInterest, stopInterest, initApp}) => {

  useEffect(() => {
      stopInterest();
      requestAccounts(user.id);
      startInterest();
      initApp();
  }, [requestAccounts, startInterest, stopInterest, initApp, user]);

  return (
    <Layout>
      <main>
        <AccountsList />
        <Operations />
        <div className="container">
          <TransactionsEnhance />
        </div>
      </main>
    </Layout>
  )
};

const enhance = compose(
  withAuthentication,
  withConnectedProps(['user']),
  withConnectedActions(['requestAccounts', 'startInterest', 'stopInterest', 'initApp']),
  branch(({user}) => user === null, IndexNotLogged)
)

const enhanceIndex = enhance(Index);
enhanceIndex.getInitialProps = async ({isServer, pathname, query}) => {
  return { isServer };
}

export default enhanceIndex;