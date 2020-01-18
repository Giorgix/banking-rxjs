// GET ACCOUNTS
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export function requestAccounts (payload) {
    return {
        type: REQUEST_ACCOUNTS
    }
}

export const RECEIVE_ACCOUNTS_FULLFILLED = 'RECEIVE_ACCOUNTS_FULLFILLED';

// DEPOSIT
export const DEPOSIT = 'DEPOSIT';
export function deposit(payload){
    return {
        type: DEPOSIT,
        ...payload
    }
}

// WITHDRAW
export const WITHDRAW = 'WITHDRAW';
export function withdraw(payload){
    return {
        type: WITHDRAW,
        ...payload
    }
}