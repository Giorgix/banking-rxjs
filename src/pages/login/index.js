import React, {useEffect} from 'react';
import Layout from '../../components/Layout';
import SignInForm from '../../components/SignInForm';
import Router from 'next/router';
import Link from 'next/link';
// Ramda
import { compose } from 'ramda';

// Components

// HOC
import {
  withConnectedActions,
  withConnectedProps
} from '../../hoc';

const Login = ({logIn, user}) => {

  useEffect(() => {
    user && Router.push('/');
  }, [user]);

  return (
    <Layout>
      <div className="login">
        <main>
          <h2>Log in</h2>
          <div>
            <SignInForm loginMethod={logIn} />
          </div>
          <p>Don't have an account? <Link href="/signup"><a>Create one!</a></Link></p>
        </main>
      </div>
    </Layout>
  )
};

const enhanceLogin = compose(
  withConnectedActions(['logIn']),
  withConnectedProps(['user'])
)(Login);

enhanceLogin.getInitialProps = async ({ store, isServer }) => {
  return { isServer }
}

export default enhanceLogin;