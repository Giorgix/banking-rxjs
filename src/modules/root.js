import { combineEpics } from 'redux-observable';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';
import getAccountsEpic from '../epics/getAccountsEpic';

export const rootEpic = combineEpics(
  getAccountsEpic,
  interestEpic,
  transactionLogEpic
);

export const rootReducer = reducer;