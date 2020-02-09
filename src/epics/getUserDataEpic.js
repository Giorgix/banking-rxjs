import { switchMap, catchError, map, filter, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { SET_USER, INIT, ERROR, LOGGED_IN } from '../actions';

// Firebase
import { doc } from 'rxfire/firestore';
import { db } from '../firebase';
import Router from 'next/router';


export default (action$, state$) => action$.pipe(
        ofType(LOGGED_IN),
        switchMap(action =>
            doc(db.doc(`users/${action.user.uid}`)).pipe(
                map((user) => { Router.push('/'); return user }),
                map(snapshot => ({id: snapshot.id, ...snapshot.data()})),
                map((user) => ({
                    type: SET_USER,
                    user

                })),
                catchError(payload => [{
                    type: ERROR,
                    hasError: true,
                    error: {
                        type: payload.name,
                        message: payload.code
                    }
                }]),
            )
        )
);
