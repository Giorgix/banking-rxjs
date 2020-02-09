import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError, timestamp, delay, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { doc } from 'rxfire/firestore';
import { db } from '../firebase';

export default (action$, state$) => action$.pipe(
        ofType('REQUEST_ACCOUNT'),
        delay(Math.trunc(Math.random() * (3000 - 500) + 500)),
        switchMap(action =>
          doc(db.doc(`accounts/${action.accountId}`)).pipe(
              map(snapshot => ({id: snapshot.id, ...snapshot.data()})),
              timestamp(),
              map(obj => ({data: {...obj.value}, timestamp: obj.timestamp,})),
              tap(console.log),
              map(payload => ({
                    type: 'RECEIVE_ACCOUNT_FULLFILLED',
                    account: payload.data,
                    receivedAt: payload.timestamp

                })),
                catchError(payload => [{
                    type: 'RECEIVE_ACCOUNT_REJECTED',
                    hasError: true,
                    error: {
                        type: payload.name,
                        message: payload.code
                    }
                }])
            )
        )
);