import { map, switchMap, catchError, timestamp, delay, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { collectionData } from 'rxfire/firestore';
import { db } from '../firebase';

const accountsRef = db.collection('accounts');

export default (action$, state$) => action$.pipe(
        ofType('REQUEST_ACCOUNTS'),
        delay(Math.trunc(Math.random() * (3000 - 500) + 500)),
        switchMap(action =>
            collectionData(accountsRef, 'id').pipe(
                tap(console.log),
                timestamp(),
                map(obj => ({data: [...obj.value], timestamp: obj.timestamp})),
                map(payload => ({
                    type: 'RECEIVE_ACCOUNTS_FULLFILLED',
                    accounts: payload.data,
                    receivedAt: payload.timestamp

                })),
                catchError(payload => [{
                    type: 'RECEIVE_ACCOUNTS_REJECTED',
                    error: true,
                    payload
                }])
            )
        )
);