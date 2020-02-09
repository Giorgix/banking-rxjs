import React, {useEffect} from 'react';
import Layout from '../../components/Layout';

// Ramda
import { compose } from 'ramda';

// Components

// HOC
import { withConnectedActions, withAuthentication } from '../../hoc';

const Login = ({logIn}) => {

  useEffect(() => {

  }, []);

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
  return { isServer }
}

export default enhaceLogin;