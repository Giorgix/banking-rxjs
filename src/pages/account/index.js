import React from 'react';
import Layout from '../../components/Layout';

// Ramda
import { compose } from 'ramda';


// HOC
import {
    withAuthentication,
    withAuthorization,
    withConnectedProps
} from '../../hoc';

const Account = ({user}) => {


  return (
    <Layout>
        <div className="account">
          {user &&
            <main>
              <h2>Account</h2>
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Email: {user.email}</p>
            </main>
          }
        </div>
    </Layout>
  )
};

const enhanceAccount = compose(
  withAuthentication,
  withAuthorization(true),
  withConnectedProps(['user'])
)(Account)

enhanceAccount.getInitialProps = async ({ store, isServer }) => {
    return { isServer }
}

export default enhanceAccount;