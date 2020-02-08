import React, {useContext} from 'react';
import NavBar from '../NavBar';
import Head from 'next/head';

// Utils
import { compose } from 'ramda';

import { AuthUserContext } from '../Session';

// HOC
import {withConnectedProps, withUserState, withAuthentication} from '../../hoc';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

/*const enhace = compose(
  withUserState
);

const Navigation = enhace(NavBar);*/

const Layout = props => {
  const user = useContext(AuthUserContext);
  console.log('user: ', user);
  
  return (
  <>
  <Head>
    <title>My styled page</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    <script src="/materialize.min.js" />
  </Head>
  <NavBar user={user} />
  <div style={layoutStyle}>
    {props.children}
  </div>
  </>
  );
  }

export default Layout;