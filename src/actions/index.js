// GET ACCOUNTS
export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export function requestAccounts (payload) {
    return {
        type: REQUEST_ACCOUNTS
    }
}

export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';
export function receiveAccounts (json) {
    console.log('action dta: ', json);
    
    return {
        type: RECEIVE_ACCOUNTS,
        accounts: json.data,
        receivedAt: Date.now()
    }
}

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

const delay = t => x => new Promise(resolve => setTimeout(() => resolve(x), t));

// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))
export function fetchAccounts() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function(dispatch) {
      // First dispatch: the app state is updated to inform
      // that the API call is starting.
      dispatch(requestAccounts())
      // The function called by the thunk middleware can return a value,
      // that is passed on as the return value of the dispatch method.
      // In this case, we return a promise to wait for.
      // This is not required by thunk middleware, but it is convenient for us.
      return fetch(`http://localhost:3000/accounts`)
        .then(delay(Math.trunc(Math.random() * (3000 - 350) + 350)))
        .then(
          response => response.json(),
          // Do not use catch, because that will also catch
          // any errors in the dispatch and resulting render,
          // causing a loop of 'Unexpected batch number' errors.
          // https://github.com/facebook/react/issues/6895
          error => console.log('An error occurred.', error)
        )
        .then(json =>
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          dispatch(receiveAccounts(json))
        )
    }
  }