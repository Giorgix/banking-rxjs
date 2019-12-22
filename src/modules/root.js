import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';

export const rootEpic = combineEpics(
  interestEpic,
  transactionLogEpic
);

export const rootReducer = reducer;