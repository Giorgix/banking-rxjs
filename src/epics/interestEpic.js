import { interval } from 'rxjs';
import { map, pluck, mergeMap } from 'rxjs/operators';

const computeInterest = p => 1 / 10 / 365 * p;

export default action$ => interval(15 * 1000).pipe(
        map(() => ({
            type: 'DEPOSIT',
            account: 'savings',
            amount: 10
        }))
);