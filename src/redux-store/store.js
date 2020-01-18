import { createStore, applyMiddleware, compose } from 'redux';
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
    didInvalidate: false,
    lastUpdated: Date.now()
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(epicMiddleware)
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}