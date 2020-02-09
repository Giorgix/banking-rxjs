import * as R from 'ramda';
import {
    RECEIVE_ACCOUNTS_FULLFILLED,
    REQUEST_ACCOUNTS,
    REQUEST_ACCOUNT,
    RECEIVE_ACCOUNT_FULLFILLED,
    RECEIVE_ACCOUNTS_REJECTED,
    RECEIVE_ACCOUNT_REJECTED,
    LOGGED_OUT,
    LOGGED_IN,
    SET_USER,
    ERROR
} from '../actions';

// Utilities to make it easier to access certain values
const checkingLens = R.lensProp('accounts.checking');
const savingsLens = R.lensProp('accounts.savings');
const transactionsLens = R.lensProp('transactions');

const withoutError = {
    hasError: false,
    error: null
}

export default function reducer (state = {
    accounts: {
        checking: 0,
        savings: 0,
    },
    transactions: []
}, action) {
    const chosenAccountIndex = R.findIndex(
        R.propEq('id', action.accountId)
    )(state.accounts);
    let newState = {};

    switch (action.type) {
        case 'LOG':

        return state;
        case 'WITHDRAW':
            console.log('Withdrawing...');
            newState = {
                ...state,
                accounts: [...state.accounts]
            };
            newState.accounts[chosenAccountIndex].balance -= parseFloat(action.amount);
            return newState;
        case 'DEPOSIT':
            console.log('Depositing...');
            newState = {
                ...state,
                accounts: [...state.accounts]
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
                didInvalidate: false,
            }
        case RECEIVE_ACCOUNTS_FULLFILLED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                accounts: action.accounts,
                lastUpdated: action.receivedAt,
                ...withoutError
            }
        case RECEIVE_ACCOUNTS_REJECTED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                error: action.error,
                hasError: action.hasError
            }
        case RECEIVE_ACCOUNT_FULLFILLED:

            const accountIndex = R.findIndex(
                R.propEq('id', action.account.id)
            )(state.accounts);

            newState = {
                ...state,
                ...withoutError
            };
            newState.accounts[accountIndex]= action.account;
            return {
                ...newState,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            }
        case RECEIVE_ACCOUNT_REJECTED:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                error: action.error,
                hasError: action.hasError
        }
        case LOGGED_OUT:
            newState = {
                ...state,
                ...withoutError
            };
            newState.accounts = [];
            newState.transactions = [];
            return {
                ...newState,
                isFetching: false,
            }
        case LOGGED_IN:
            return {
                ...state,
                ...withoutError
            }
        case SET_USER:
            return {
                ...state,
                user: action.user,
                ...withoutError
            }
        case ERROR:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                error: action.error,
                hasError: action.hasError
            }
        default:
            return state;
    }
}