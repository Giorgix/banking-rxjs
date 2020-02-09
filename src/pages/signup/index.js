import React, {useEffect} from 'react';
import Layout from '../../components/Layout';
import SignUpForm from '../../components/SignUpForm';
import Router from 'next/router';
import Link from 'next/link';

// Ramda
import { compose } from 'ramda';

// Components

// HOC
import {
  withConnectedActions,
  withAuthentication,
  withConnectedProps
} from '../../hoc';

const SignUp = ({signUp, user}) => {

  useEffect(() => {
    user && Router.push('/');
  }, [user]);

  return (
    <Layout>
      <div className="login">
        <main>
          <h2>Create an account</h2>
          <div>
            <SignUpForm signUpMethod={signUp} />
          </div>
          <p>Already have an account? <Link href="/login"><a>Log in</a></Link></p>
        </main>
      </div>
    </Layout>
  )
};

const enhanceSignUp = compose(
  withConnectedActions(['signUp']),
  withConnectedProps(['user']),
  withAuthentication
)(SignUp);

enhanceSignUp.getInitialProps = async ({ store, isServer }) => {
  return { isServer }
}

export default enhanceSignUp;