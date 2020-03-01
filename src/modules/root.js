import { combineEpics } from 'redux-observable';
import reducer from '../reducers';
import interestEpic from '../epics/interestEpic';
import transactionLogEpic from '../epics/transaction';
import getProductsEpic from '../epics/getProductsEpic';
import getAvailableProductsEpic from '../epics/getAvailableProductsEpic';
import getProductEpic from '../epics/getProductEpic';
import logOutEpic from '../epics/logOutEpic';
import logInEpic from '../epics/logInEpic';
import signUpEpic from '../epics/signUpEpic';
import signedUpEpic from '../epics/signedUpEpic';
import addProductEpic from '../epics/addProductEpic';
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
    getProductsEpic,
    getAvailableProductsEpic,
    addProductEpic,
    interestEpic,
    transactionLogEpic,
    logOutEpic,
    logInEpic,
    signUpEpic,
    signedUpEpic,
    //getUserDataEpic,
    getProductEpic,
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export const rootReducer = reducer;