// GET ACCOUNTS
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS_FULLFILLED = 'RECEIVE_ACCOUNTS_FULLFILLED';
export const RECEIVE_ACCOUNTS_REJECTED = 'RECEIVE_ACCOUNTS_REJECTED';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT_FULLFILLED = 'RECEIVE_ACCOUNT_FULLFILLED';
export const RECEIVE_ACCOUNT_REJECTED = 'RECEIVE_ACCOUNT_REJECTED';
export const START_INTEREST = 'START_INTEREST';
export const STOP_INTEREST = 'STOP_INTEREST';
export const DEPOSIT = 'DEPOSIT';
export const WITHDRAW = 'WITHDRAW';
export const ERROR = 'ERROR';
export const LOG_OUT = 'LOG_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';

export function requestAccounts (payload) {
    return {
        type: REQUEST_ACCOUNTS
    }
}

export function startInterest (payload) {
    return {
        type: START_INTEREST
    }
}

export function stopInterest (payload) {
    return {
        type: STOP_INTEREST
    }
}


// DEPOSIT
export function deposit(payload){
    return {
        type: DEPOSIT,
        ...payload
    }
}

// WITHDRAW
export function withdraw(payload){
    return {
        type: WITHDRAW,
        ...payload
    }
}

// LOG IN
export function logIn(payload){
    return {
        type: LOG_IN,
        ...payload
    }
}

// LOG OUT
export function logOut(payload){
    return {
        type: LOG_OUT
    }
}