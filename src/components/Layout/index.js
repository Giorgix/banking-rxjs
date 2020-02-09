import React from 'react';
import NavBar from '../NavBar';
import Head from 'next/head';

// Utils
import { compose } from 'ramda';


// HOC
import { withConnectedProps } from '../../hoc';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const enhace = compose(
  withConnectedProps(['user'])
);

const Navigation = enhace(NavBar);

const Layout = props => {
  return (
    <>
    <Head>
      <title>My styled page</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <script src="/materialize.min.js" />
    </Head>
    <Navigation />
    <div style={layoutStyle}>
      {props.children}
    </div>
    </>
  );
}

export default Layout;