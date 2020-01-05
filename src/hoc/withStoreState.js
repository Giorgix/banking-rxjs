import React, {useState, useEffect} from 'react';
import {curry} from 'ramda';
import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';

export default curry((store, storeDispatcher, BaseComponent) => props => {

    const [data, setData] = useState({
        isFetching: true,
        didInvalidate: false
    });

    useEffect(() => {
      store.pipe(
        //distinctUntilChanged('accounts'),
        //pluck('accounts'),
      ).subscribe(setData);
    });

    return <BaseComponent dispatch={storeDispatcher} {...props} {...data} />;
});