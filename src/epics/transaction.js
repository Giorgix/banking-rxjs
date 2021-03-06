import { iif, of, throwError } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, timestamp, mergeMap, mapTo, catchError, tap } from 'rxjs/operators';

class Transaction {
    constructor(account, amount, balance, type, timestamp) {
        this.account = account;
        this.amount = amount;
        this.balance = balance;
        this.type = type;
        this.timestamp = timestamp;
    }
}

const validate = (validator, onFail) => (transaction) =>
    iif(() => validator(transaction), of(transaction), onFail);

const overdraftValidator = (transaction) => {
    console.log('validating..', transaction);
    return transaction.balance >= 0;
}

// Epics take a stream of actions in and return a stream of actions out
export default (action$, state$) => action$.pipe(
        ofType('WITHDRAW', 'DEPOSIT'),
        timestamp(),
        map(obj => ({...obj.value, timestamp: obj.timestamp,})),
        tap(console.log),
        map(action => {
            const {accounts} = state$.value;
            const selectedAccount = accounts.find((account) => String(account.id) === String(action.accountId));
            return {
                ...action,
                alias: selectedAccount.alias,
                balance: selectedAccount.balances[0].amount || 0
            }
        }),
        map(datedAction => (
            new Transaction(
                datedAction.alias,
                datedAction.amount,
                datedAction.balance,
                datedAction.type,
                datedAction.timestamp
            )
        )),
        mergeMap(datedTransaction =>
            validate(overdraftValidator, throwError('OVERDRAFT'))(datedTransaction).pipe(
                mapTo({type: 'ADD_TRANSACTION', datedTransaction}),

                // Dispatches instead an error action to the store to signal to the user that an error has occurred
                catchError(err => {
                    return of({type: 'LOG', payload: `Transacxtion write failure: ${err}`})
                })
            )
        )
);