import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOG_IN, LOGGED_IN, ERROR } from '../actions';
// Firebase
import {firebaseAuth} from '../firebase';

export default (action$, state$) => action$.pipe(
        ofType(LOG_IN),
        switchMap(action =>
            from(firebaseAuth.signInWithEmailAndPassword(action.user, action.password)).pipe(
                map(() => ({
                    type: LOGGED_IN

                })),
                catchError(payload => [{
                    type: ERROR,
                    error: true,
                    payload
                }]),
            )
        )
);
