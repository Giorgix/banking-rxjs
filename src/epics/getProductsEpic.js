import { map, switchMap, catchError, timestamp, delay, tap, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { collectionData } from 'rxfire/firestore';
import { db } from '../firebase';
import {
    LOGGED_OUT,
    REQUEST_ACCOUNTS,
    RECEIVE_ACCOUNTS_FULLFILLED,
    RECEIVE_ACCOUNTS_REJECTED
} from '../actions';

const accountsRef = db.collection('products');

export default (action$, state$) => action$.pipe(
        ofType(REQUEST_ACCOUNTS),
        delay(Math.trunc(Math.random() * (3000 - 500) + 500)),
        switchMap(action =>
            collectionData(accountsRef.where("user_id", "==", action.payload), 'id').pipe(
                timestamp(),
                map(obj => ({data: [...obj.value], timestamp: obj.timestamp})),
                map(payload => ({
                    type: RECEIVE_ACCOUNTS_FULLFILLED,
                    accounts: payload.data,
                    receivedAt: payload.timestamp

                })),
                catchError(payload => [{
                    type: RECEIVE_ACCOUNTS_REJECTED,
                    hasError: true,
                    error: {
                        type: payload.name,
                        message: payload.code
                    }
                }]),
                takeUntil(
                    action$.ofType(
                      LOGGED_OUT
                    )
                  )
            )
        )
);