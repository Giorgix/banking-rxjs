import React, {useState, useEffect} from 'react';
import {curry, merge} from 'ramda';
import {merge as mergeAll} from 'rxjs';
import { doc } from 'rxfire/firestore';
import { db, authObservable$ } from '../firebase';
import {filter, switchMap, map, distinct, tap} from 'rxjs/operators';


export default curry((observable$, BaseComponent) => props => {

    const [user, setUser] = useState({
        username: '',
        profile_picture: ''
    });

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
        distinct()
      ).subscribe(setUser);

      return function cleanup() {
          auth$.unsubscribe();
      };
    },[setUser]);

    return <BaseComponent {...merge(props, {user})} />;
})(authObservable$);