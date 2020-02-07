import React from 'react';
import NavBar from '../NavBar';
import Head from 'next/head';

// Firebase
import { authState } from 'rxfire/auth';
import {firebaseAuth} from '../../firebase';

// Redux
import { connect } from 'react-redux';
import {requestAccounts, startInterest, stopInterest} from '../../actions';

import { compose, prop, curry } from 'ramda';

// HOC
import {withUserState} from '../../hoc';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const enhace = compose(
  withUserState(authState(firebaseAuth)),
);

const Navigation = enhace(NavBar);

const Layout = props => (
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

export default Layout;