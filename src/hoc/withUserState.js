import React, {useState, useEffect} from 'react';
import {curry, merge} from 'ramda';
import {merge as mergeAll} from 'rxjs';
import { doc } from 'rxfire/firestore';
import { db } from '../firebase';
import {filter, switchMap, map, switchAll} from 'rxjs/operators';

export default curry((observable$, BaseComponent) => props => {

    const [user, setUser] = useState({
        username: '',
        profile_picture: ''
    });

    useEffect(() => {
      const loggedIn$ = observable$.pipe(
        filter(u => u !== null),
        // TODO branch behaviour to subscribe to null users (logged out)
        switchMap(user =>
          doc(db.doc(`users/${user.uid}`)).pipe(
            map(snapshot => ({id: snapshot.id, ...snapshot.data()}))
          )
        )
      );
      const loggedOut$ = observable$.pipe(
        filter(u => u === null),
        // TODO branch behaviour to subscribe to null users (logged out)
      );
      const auth$ = mergeAll(loggedIn$, loggedOut$).subscribe(setUser);

      return function cleanup() {
          auth$.unsubscribe();
      };
    },[setUser]);

    return <BaseComponent {...merge(props, {user})} />;
});