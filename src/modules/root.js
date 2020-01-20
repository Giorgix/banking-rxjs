import { combineEpics } from 'redux-observable';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';
import getAccountsEpic from '../epics/getAccountsEpic';
import getAccountEpic from '../epics/getAccountEpic';

export const rootEpic = combineEpics(
  getAccountsEpic,
  interestEpic,
  transactionLogEpic,
  getAccountEpic,
);

export const rootReducer = reducer;