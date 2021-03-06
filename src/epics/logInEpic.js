import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOG_IN, LOGGED_IN, ERROR } from '../actions';
// Firebase
import {firebaseAuth} from '../firebase';
import Router from 'next/router';


export default (action$, state$) => action$.pipe(
        ofType(LOG_IN),
        switchMap(action =>
            from(firebaseAuth.signInWithEmailAndPassword(action.user, action.password)).pipe(
                tap(() => Router.push('/')),
                map((data) => ({
                    type: LOGGED_IN,
                    user: data.user

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
