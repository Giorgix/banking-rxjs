import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOG_OUT, LOGGED_OUT, ERROR } from '../actions';
import {firebaseAuth} from '../firebase';

export default (action$, state$) => action$.pipe(
        ofType(LOG_OUT),
        switchMap(action =>
            from(firebaseAuth.signOut()).pipe(
                tap(console.log),
                map(() => ({
                    type: LOGGED_OUT

                })),
                catchError(payload => [{
                    type: ERROR,
                    error: true,
                    payload
                }]),
            )
        )
);