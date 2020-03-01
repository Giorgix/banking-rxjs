import { map, switchMap, catchError, timestamp, delay, tap, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { collectionData } from 'rxfire/firestore';
import { db } from '../firebase';
import {
    REQUEST_AVAILABLE_PRODUCTS,
    RECEIVE_AVAILABLE_PRODUCTS_FULLFILLED,
    RECEIVE_AVAILABLE_PRODUCTS_REJECTED,
    LOGGED_OUT
} from '../actions';

const availableProductsRef = db.collection('available_products');

export default (action$, state$) => action$.pipe(
        ofType(REQUEST_AVAILABLE_PRODUCTS),
        delay(Math.trunc(Math.random() * (3000 - 500) + 500)),
        switchMap(action =>
            collectionData(availableProductsRef, 'id').pipe(
                timestamp(),
                map(obj => ({data: [...obj.value], timestamp: obj.timestamp})),
                map(payload => ({
                    type: RECEIVE_AVAILABLE_PRODUCTS_FULLFILLED,
                    availableProducts: payload.data,
                    receivedAt: payload.timestamp

                })),
                catchError(payload => [{
                    type: RECEIVE_AVAILABLE_PRODUCTS_REJECTED,
                    hasError: true,
                    error: {
                        type: payload.name,
                        message: payload.code
                    }
                }]),
                takeUntil(
                    action$.ofType(
                      LOGGED_OUT
                    )
                  )
            )
        )
);