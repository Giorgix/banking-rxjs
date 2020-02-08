import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import configureStore from '../redux-store/store.js';
import Layout from '../components/Layout';
import { withAuthentication } from '../hoc';
import 'materialize-css/dist/css/materialize.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

const withAuthApp = withAuthentication(MyApp)

export default withRedux(configureStore)(MyApp)