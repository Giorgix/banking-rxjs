import React, {useEffect} from 'react';
import Layout from '../../components/Layout';

// Ramda
import { compose, prop, curry } from 'ramda';

// Components
import Spinner from '../../components/Spinner';

// Redux
import { connect } from 'react-redux'
import {requestAccounts, startInterest, stopInterest, logIn} from '../../actions'

// HOC
import { withConnectedActions, withAuthentication } from '../../hoc';

const Login = ({logIn}) => {

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
        <h2>Login page</h2>
        <div>
          <a
            className="waves-effect waves-light btn-small"
            onClick={() => logIn({user: 'jorgemdramos@gmail.com', password: '11223344'})}
          >
            <i className="material-icons left">account_circle</i>LOG IN WITH DEMO ACCOUNT
          </a>
        </div>
      </main>
    </div>
    </Layout>
  )
};

const enhaceLogin = compose(
  withConnectedActions(['logIn']),
  withAuthentication
)(Login);

enhaceLogin.getInitialProps = async ({ store, isServer }) => {

    /*const state$ = new StateObservable(new Subject(), store.getState())
    const resultAction = await rootEpic(
      of({type: 'REQUEST_ACCOUNTS'}),
      state$
    ).toPromise() // we need to convert Observable to Promise
    console.log('result action: ', resultAction);*/

    return { isServer }
  }

export default enhaceLogin;