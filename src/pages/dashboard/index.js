import React from 'react';
import Layout from '../../components/Layout';

// Ramda
import { compose } from 'ramda';


// HOC
import {
    withAuthentication,
    withAuthorization
} from '../../hoc';

const Dashboard = ({requestAccounts, startInterest, stopInterest}) => {


  return (
    <Layout>
        <div className="login">
          <main>
            <p>Dashboard private page</p>
          </main>
        </div>
    </Layout>
  )
};

const enhaceDashboard = compose(
  withAuthentication,
  withAuthorization(true)
)(Dashboard)

enhaceDashboard.getInitialProps = async ({ store, isServer }) => {
    return { isServer }
}

export default enhaceDashboard;