import { iif, of, throwError } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, timestamp, mergeMap, mapTo, catchError, filter, tap } from 'rxjs/operators';

class Transaction {
    constructor(account, amount, balance, timestamp) {
        this.account = account;
        this.amount = amount;
        this.balance = balance;
        this.timestamp = timestamp;
    }
}

const validate = (validator, onFail) => (transaction) =>
    iif(() => validator(transaction), of(transaction), onFail);

const overdraftValidator = (transaction) =>
    transaction.balance > 0 || transaction.amount > 0;

// Epics take a stream of actions in and return a stream of actions out
export default action$ => action$.pipe(
        ofType('WITHDRAW', 'DEPOSIT'),
        timestamp(),
        map(obj => ({...obj.value, timestamp: obj.timestamp})),
        tap(console.log),
        map(datedAction => (
            new Transaction(
                datedAction.account,
                datedAction.amount,
                datedAction.balance,
                datedAction.timestamp
            )
        )),
        mergeMap(datedTransaction =>
            validate(overdraftValidator, throwError('OVERDRAFT'))(datedTransaction).pipe(
                tap(console.log),
                mapTo({type: 'ADD_TRANSACTION', datedTransaction}),

                // Dispatches instead an error action to the store to signal to the user that an error has occurred
                catchError(err => {
                    return of({type: 'LOG', payload: `Transacxtion write failure: ${err.message}`})
                })
            )
        )
);