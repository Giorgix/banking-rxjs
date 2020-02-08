import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '../modules/root';


const initialState = {
  accounts: [],
  transactions: [],
  isFetching: true,
  lastUpdated: Date.now(),
  user: null
}

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}