import React from 'react';
import Router from 'next/router';

import { firebaseAuth } from '../firebase';

const withAuthorization = (needsAuthorization) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebaseAuth.onAuthStateChanged(authUser => {
        if (!authUser && needsAuthorization) {
          Router.push('/login')
        }
      });
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  return WithAuthorization;
}

export default withAuthorization;