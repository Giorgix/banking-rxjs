import * as R from 'ramda';


// Utilities to make it easier to access certain values
const accountsLens = R.lensProp('accounts');
const messagesLens = R.lensProp('messages');
const resultsLens = R.lensProp('results');
const transactionsLens = R.lensProp('transactions');
const queryLens = R.lensProp('query');


export default function reducer (state = {
    accounts: {
        checking: 0,
        savings: 0,
    },
    transactions: []
}, action) {
    switch (action.type) {
        case 'LOG':
            console.log(`LOG: ${action.payload}`);
            return state;
        case 'WITHDRAW':
            console.log('Withdrawing...');
            return {
                ...state,
                accounts: {
                    [action.account]: state.accounts[action.account] - parseFloat(action.amount)
                }
            };
        case 'DEPOSIT':
                console.log('Depositing...');
            return {
                ...state,
                accounts: {
                    [action.account]: state.accounts[action.account] + parseFloat(action.amount)
                }
            }
        case 'ADD_TRANSACTION':
            console.log('Adding transaction', action);
            return R.over(transactionsLens, R.prepend(action.datedTransaction), state);
        default:
            return state;
    }
}