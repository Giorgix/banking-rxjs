import { combineEpics } from 'redux-observable';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';
import getAccountsEpic from '../epics/getAccountsEpic';
import getAccountEpic from '../epics/getAccountEpic';
import logOutEpic from '../epics/logOutEpic';
import logInEpic from '../epics/logInEpic';
import signUpEpic from '../epics/signUpEpic';
import signedUpEpic from '../epics/signedUpEpic';
import getUserDataEpic from '../epics/getUserDataEpic';
import { catchError } from 'rxjs/operators';


/**
 * Adding global error handler
 *
 * Uncaught errors can bubble up to the root epic and cause the entire stream
 * to terminate. As a consequence, epics registered in the middleware will no longer
 * run in your application. To alleviate this issue, we can add a global error handler
 * to the root epic that catches uncaught errors and resubscribes to the source stream.
 */
export const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    getAccountsEpic,
    interestEpic,
    transactionLogEpic,
    logOutEpic,
    logInEpic,
    signUpEpic,
    signedUpEpic,
    //getUserDataEpic,
    getAccountEpic,
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export const rootReducer = reducer;