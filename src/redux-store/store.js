import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '../modules/root';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    accounts: {
        checking: 100,
        savings: 100
    },
    transactions: [],
    isFetching: true,
    didInvalidate: false
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(
          thunkMiddleware, // lets us dispatch() functions
          epicMiddleware
        )
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}