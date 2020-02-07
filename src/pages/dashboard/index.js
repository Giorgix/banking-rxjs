import React, {useEffect} from 'react';
import Layout from '../../components/Layout';

// Ramda
import { compose, prop, curry } from 'ramda';

// Firebase

// Components
import Spinner from '../../components/Spinner';

// Redux
import { connect } from 'react-redux'
import {requestAccounts, startInterest, stopInterest} from '../../actions'

// HOC
import {
    branch,
    toList,
    withConnectedProps
} from '../../hoc';

const Dashboard = ({requestAccounts, startInterest, stopInterest}) => {

  useEffect(() => {

  }, []);

  /*useEffect(() => {
      setTimeout(() => {
          stopInterest();
      }, 8000);
  }, [stopInterest]);*/
  return (
      <Layout>
      <div className="login">
      <main>
        <p>Dashboard page</p>
      </main>
    </div>
  </Layout>
  )
};

Dashboard.getInitialProps = async ({ store, isServer }) => {

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
  })(Dashboard)