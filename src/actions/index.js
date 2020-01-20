// GET ACCOUNTS
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS_FULLFILLED = 'RECEIVE_ACCOUNTS_FULLFILLED';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT_FULLFILLED = 'RECEIVE_ACCOUNT_FULLFILLED';
export const RECEIVE_ACCOUNT_REJECTED = 'RECEIVE_ACCOUNT_REJECTED';
export const DEPOSIT = 'DEPOSIT';
export const WITHDRAW = 'WITHDRAW';

export function requestAccounts (payload) {
    return {
        type: REQUEST_ACCOUNTS
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