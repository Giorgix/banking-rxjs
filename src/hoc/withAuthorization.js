import React, {useEffect} from 'react';
import {curry} from 'ramda';
import { authObservable$ } from '../firebase';
import {filter, map} from 'rxjs/operators';
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
    });

    return (
      <BaseComponent {...props} />
    )
})(authObservable$);