import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '../modules/root';

const epicMiddleware = createEpicMiddleware();

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
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}