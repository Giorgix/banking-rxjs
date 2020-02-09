import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { SIGNED_UP, INIT, ERROR } from '../actions';
// Firebase

import {db} from '../firebase';
import Router from 'next/router';


export default (action$, state$) => action$.pipe(
        ofType(SIGNED_UP),
        switchMap(action =>
            from(db.collection('users').doc(action.userId).set({
                    ...action.userData
            })).pipe(
                tap((data) => Router.push('/')),
                map((data) => ({
                    type: INIT,
                    user: data

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
