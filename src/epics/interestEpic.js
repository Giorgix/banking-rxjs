import { interval } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {START_INTEREST, STOP_INTEREST, LOGGED_OUT, DEPOSIT} from '../actions';

const computeInterest = p => 1 / 10 / 365 * p;

export default (action$, state$) => action$.pipe(
    ofType(START_INTEREST),
    mergeMap(action => {
        return interval(10000).pipe(
            map(() => ({
            type: DEPOSIT,
            accountId: state$.value.accounts[0].id,
            amount: computeInterest(state$.value.accounts[0].balance)
            })),
            takeUntil(
            action$.ofType(
              STOP_INTEREST,
              LOGGED_OUT
            )
          )
        )
      })
)