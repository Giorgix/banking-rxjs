import * as R from 'ramda';
import {RECEIVE_ACCOUNTS_FULLFILLED, REQUEST_ACCOUNTS, REQUEST_ACCOUNT, RECEIVE_ACCOUNT_FULLFILLED} from '../actions';

// Utilities to make it easier to access certain values
const checkingLens = R.lensProp('accounts.checking');
const savingsLens = R.lensProp('accounts.savings');
const transactionsLens = R.lensProp('transactions');


export default function reducer (state = {
    accounts: {
        checking: 0,
        savings: 0,
    },
    transactions: []
}, action) {
    const chosenAccountIndex = R.findIndex(
        R.propEq('id', parseInt(action.accountId))
    )(state.accounts);
    let newState = {};

    switch (action.type) {
        case 'LOG':
            console.log(`LOG: ${action.payload}`);
            return state;
        case 'WITHDRAW':
            console.log('Withdrawing...');
            newState = {
                ...state,
            };
            newState.accounts[chosenAccountIndex].balance -= parseFloat(action.amount);
            return newState;
        case 'DEPOSIT':
            console.log('Depositing...');
            newState = {
                ...state,
            };
            newState.accounts[chosenAccountIndex].balance += parseFloat(action.amount);
            return newState;
        case 'ADD_TRANSACTION':
            console.log('Adding transaction', action);
            return R.over(transactionsLens, R.prepend(action.datedTransaction), state);
        case REQUEST_ACCOUNTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case REQUEST_ACCOUNT:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_ACCOUNTS_FULLFILLED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                accounts: action.accounts,
                lastUpdated: action.receivedAt
            }
        case RECEIVE_ACCOUNT_FULLFILLED:

            const accountIndex = R.findIndex(
                R.propEq('id', parseInt(action.account.id))
            )(state.accounts);

            newState = {
                ...state,
            };
            newState.accounts[accountIndex]= action.account;
            return {
                ...newState,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}