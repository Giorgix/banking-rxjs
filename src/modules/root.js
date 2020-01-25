import { combineEpics } from 'redux-observable';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';
import getAccountsEpic from '../epics/getAccountsEpic';
import getAccountEpic from '../epics/getAccountEpic';
import { catchError } from 'rxjs/operators';


export const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    getAccountsEpic,
    interestEpic,
    transactionLogEpic,
    getAccountEpic,
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export const rootReducer = reducer;