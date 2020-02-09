import React from 'react';
import { connect } from 'react-redux';
import { SET_USER } from '../actions';
import {merge as mergeAll} from 'rxjs';
import { doc } from 'rxfire/firestore';
import { db, authObservable$ } from '../firebase';
import {filter, switchMap, map, distinct, tap} from 'rxjs/operators';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetUser } = this.props;

      const loggedIn$ = authObservable$.pipe(
        filter(u => u !== null),
        switchMap(user =>
          doc(db.doc(`users/${user.uid}`)).pipe(
            map(snapshot => ({id: snapshot.id, ...snapshot.data()}))
          )
        )
      );
      const loggedOut$ = authObservable$.pipe(
        filter(u => u === null),
      );
      const auth$ = mergeAll(loggedIn$, loggedOut$).pipe(
        distinct(),
        tap(user => console.log('withAuth2: ', user))
      ).subscribe(onSetUser);
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetUser: (user) => dispatch({ type: SET_USER, user }),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;