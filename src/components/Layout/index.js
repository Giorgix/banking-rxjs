import React from 'react';
import NavBar from '../NavBar';
import ErrorMessage from '../Error';
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

const enhance = compose(
  withConnectedProps(['user'])
);

const Navigation = enhance(NavBar);

const EnhanceError = compose(
  withConnectedProps(['error'])
)(ErrorMessage);

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
      <EnhanceError />
      {props.children}
    </div>
    </>
  );
}

export default Layout;