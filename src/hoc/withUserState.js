import React, {useState, useEffect} from 'react';
import {curry, merge} from 'ramda';
import { doc } from 'rxfire/firestore';
import { db } from '../firebase';
import {filter, switchMap, map} from 'rxjs/operators';

export default curry((observable$, BaseComponent) => props => {

    const [user, setUser] = useState({
        username: '',
        profile_picture: ''
    });

    useEffect(() => {
      const subscription = observable$.pipe(
        filter(u => u !== null),
        switchMap(user =>
          doc(db.doc(`users/${user.uid}`)).pipe(
            map(snapshot => ({id: snapshot.id, ...snapshot.data()}))
          )
        )
      ).subscribe(setUser);

      return function cleanup() {
          subscription.unsubscribe();
      }
    },[setUser]);

    return <BaseComponent {...merge(props, {user})} />;
});