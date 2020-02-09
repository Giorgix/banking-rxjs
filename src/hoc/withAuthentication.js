import React, {useState, useEffect} from 'react';
import {curry, merge ,compose} from 'ramda';
import {merge as mergeAll} from 'rxjs';
import { doc } from 'rxfire/firestore';
import { db, authObservable$ } from '../firebase';
import {filter, switchMap, map, distinct, tap} from 'rxjs/operators';
import withConnectedActions from './withConnectedActions';

const withAuthentication = curry((observable$, BaseComponent) => props => {

    useEffect(() => {
      const loggedIn$ = observable$.pipe(
        filter(u => u !== null),
        switchMap(user =>
          doc(db.doc(`users/${user.uid}`)).pipe(
            map(snapshot => ({id: snapshot.id, ...snapshot.data()}))
          )
        )
      );
      const loggedOut$ = observable$.pipe(
        filter(u => u === null),
      );
      const auth$ = mergeAll(loggedIn$, loggedOut$).pipe(
        distinct(),
        tap(user => console.log('withAuth: ', user))
      ).subscribe(props.setUser);

      return function cleanup() {
          auth$.unsubscribe();
      };
    },[props.setUser]);

    return (
      <BaseComponent {...props} />
    )
})(authObservable$);

export default compose(
  withConnectedActions(['setUser']),
  withAuthentication
)