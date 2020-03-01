// GET ACCOUNTS
export const INIT = 'INIT';
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS_FULLFILLED = 'RECEIVE_ACCOUNTS_FULLFILLED';
export const RECEIVE_ACCOUNTS_REJECTED = 'RECEIVE_ACCOUNTS_REJECTED';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const RECEIVE_ACCOUNT_FULLFILLED = 'RECEIVE_ACCOUNT_FULLFILLED';
export const RECEIVE_ACCOUNT_REJECTED = 'RECEIVE_ACCOUNT_REJECTED';
export const ADD_PRODUCT_FULLFILLED = 'ADD_PRODUCT_FULLFILLED';
export const ADD_PRODUCT_REJECTED = 'ADD_PRODUCT_REJECTED';
export const REQUEST_AVAILABLE_PRODUCTS = 'REQUEST_AVAILABLE_PRODUCTS';
export const RECEIVE_AVAILABLE_PRODUCTS_FULLFILLED = 'RECEIVE_AVAILABLE_PRODUCTS_FULLFILLED';
export const RECEIVE_AVAILABLE_PRODUCTS_REJECTED = 'RECEIVE_AVAILABLE_PRODUCTS_REJECTED';
export const REQUEST_ADD_PRODUCT = 'REQUEST_ADD_PRODUCT';
export const START_INTEREST = 'START_INTEREST';
export const STOP_INTEREST = 'STOP_INTEREST';
export const DEPOSIT = 'DEPOSIT';
export const WITHDRAW = 'WITHDRAW';
export const ERROR = 'ERROR';
export const LOG_OUT = 'LOG_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGGED_IN = 'LOGGED_IN';
export const LOG_IN = 'LOG_IN';
export const SET_USER = 'SET_USER';
export const SIGN_UP = 'SIGN_UP';
export const SIGNED_UP = 'SIGNED_UP';

export function requestAccounts (payload) {
    return {
        type: REQUEST_ACCOUNTS,
        payload
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

// INIT
export function initApp(payload){
    return {
        type: INIT
    }
}

// LOG IN
export function logIn(payload){
    return {
        type: LOG_IN,
        ...payload
    }
}

// SIGN UP
export function signUp(payload){
    return {
        type: SIGN_UP,
        ...payload
    }
}

// SET USER
export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

// LOG OUT
export function logOut(payload){
    return {
        type: LOG_OUT
    }
}

export function requestAvailableProducts (payload) {
    return {
        type: REQUEST_AVAILABLE_PRODUCTS,
        payload
    }
}

export function addProduct (payload) {
    return {
        type: REQUEST_ADD_PRODUCT,
        payload
    }
}