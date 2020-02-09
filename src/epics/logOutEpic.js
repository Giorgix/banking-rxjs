import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOG_OUT, LOGGED_OUT, ERROR } from '../actions';
import {firebaseAuth} from '../firebase';
import Router from 'next/router';

export default (action$, state$) => action$.pipe(
        ofType(LOG_OUT),
        switchMap(action =>
            from(firebaseAuth.signOut()).pipe(
                map(() => Router.push('/login')),
                map(() => ({
                    type: LOGGED_OUT

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