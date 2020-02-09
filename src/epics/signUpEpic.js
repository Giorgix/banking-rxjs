import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { SIGN_UP, SIGNED_UP, ERROR } from '../actions';
// Firebase
import {firebaseAuth} from '../firebase';


export default (action$, state$) => action$.pipe(
        ofType(SIGN_UP),
        switchMap(action =>
            from(firebaseAuth.createUserWithEmailAndPassword(action.email, action.password)).pipe(
                map((data) => ({
                    type: SIGNED_UP,
                    userId: data.user.uid,
                    userData: {
                        first_name: action.firstName,
                        last_name: action.lastName,
                        username: action.username,
                        profile_picture: 'https://picsum.photos/300/300',
                        email: data.user.email
                    }

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
