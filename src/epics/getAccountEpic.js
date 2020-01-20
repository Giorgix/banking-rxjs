import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError, timestamp, delay } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export default (action$, state$) => action$.pipe(
        ofType('REQUEST_ACCOUNT'),
        delay(Math.trunc(Math.random() * (3000 - 500) + 500)),
        switchMap(action =>
          ajax(`http://localhost:3000/accounts/${action.accountId}`).pipe(
                map(responseObj => responseObj.response),
                timestamp(),
                map(obj => ({data: {...obj.value}, timestamp: obj.timestamp,})),
                map(payload => ({
                    type: 'RECEIVE_ACCOUNT_FULLFILLED',
                    account: payload.data,
                    receivedAt: payload.timestamp

                })),
                catchError(payload => [{
                    type: 'RECEIVE_ACCOUNT_REJECTED',
                    error: true,
                    payload
                }])
            )
        )
);