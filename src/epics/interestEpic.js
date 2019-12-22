import { interval } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

const computeInterest = p => 1 / 10 / 365 * p;

export default function interestEpic(action$, store) {
    return interval(15 * 1000).pipe(
        map(() => store.getState()),
        pluck('accounts'),
        map(({savings}) => ({
            type: 'DEPOSIT',
            account: 'savings',
            amount: computeInterest(savings)
        }))
    )
}