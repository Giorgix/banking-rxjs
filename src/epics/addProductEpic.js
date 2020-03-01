import { from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
    REQUEST_ADD_PRODUCT,
    ADD_PRODUCT_FULLFILLED,
    ADD_PRODUCT_REJECTED,
    ERROR
} from '../actions';
// Firebase

import {db} from '../firebase';
import Router from 'next/router';

const generateRandomProduct = (userId, productId) => {
    // TODO really randomize product creation :)
    return {
        productId: productId,
        alias: "Tarjeta Credito",
        type: 'CREDIT_CARD',
        updatedAt: Date.now(),
        user_id: userId,
        balances: [
            {
                type: 'AVAILABLE',
                amount: 1460
            },
            {
                type: 'USED',
                amount: 4540
            }
        ]
    }
}

export default (action$, state$) => action$.pipe(
        ofType(REQUEST_ADD_PRODUCT),
        switchMap(action =>
            from(db.collection('products').add(
                generateRandomProduct(action.payload.userId, action.payload.productId))).pipe(
                tap((data) => Router.push('/')),
                map((data) => ({
                    type: ADD_PRODUCT_FULLFILLED,
                    product: data

                })),
                catchError(payload => [{
                    type: ERROR,
                    hasError: true,
                    error: {
                        type: payload.name,
                        message: payload.code
                    }
                }]),
            )
        )
);
