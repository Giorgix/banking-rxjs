import { createStore } from 'redux'
import reducer from '../reducers';

const initialState = {
    accounts: {
        checking: 100,
        savings: 100
    },
    transactions: []
};

export default createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());