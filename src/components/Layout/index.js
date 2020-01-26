import React from 'react';
import NavBar from '../NavBar';
import Head from 'next/head';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <>
  <Head>
    <title>My styled page</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    <script src="/materialize.min.js" />
  </Head>
  <NavBar />
  <div style={layoutStyle}>
    {props.children}
  </div>
  </>
);

export default Layout;