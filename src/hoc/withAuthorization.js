import React, {useEffect} from 'react';
import {curry} from 'ramda';
import {merge as mergeAll} from 'rxjs';
import { doc } from 'rxfire/firestore';
import { db, authObservable$ } from '../firebase';
import {filter, switchMap, map, distinct, tap} from 'rxjs/operators';
import Router from 'next/router';

export default curry((observable$, needsAuth, BaseComponent) => props => {

    useEffect(() => {
      const loggedIn$ = observable$.pipe(
        filter(user => !user  && needsAuth),
        map(() => Router.push('/login'))
      );
      const auth$ = loggedIn$.subscribe();

      return function cleanup() {
          auth$.unsubscribe();
      };
    },[props.setUser]);

    return (
      <BaseComponent {...props} />
    )
})(authObservable$);