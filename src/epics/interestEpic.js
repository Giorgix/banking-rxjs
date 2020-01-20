import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

const computeInterest = p => 1 / 10 / 365 * p;

export default (action$, state$) => interval(15 * 1000).pipe(
        map(() => ({
            type: 'DEPOSIT',
            accountId: 2,
            amount: computeInterest(state$.value.accounts[1].balance)
        }))
);