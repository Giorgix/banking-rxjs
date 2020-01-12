import React, {useState, useEffect} from 'react';
import {curry, merge} from 'ramda';
import { distinctUntilChanged, pluck, map, tap } from 'rxjs/operators';

export default curry((store, BaseComponent) => props => {

    const [data, setData] = useState({
        isFetching: true,
        didInvalidate: false
    });

    useEffect(() => {
      const subscription = store.pipe(
        //distinctUntilChanged('accounts'),
        //tap(console.log),
        //pluck('accounts'),
        //map(mapStateToProps),
      ).subscribe(setData);

      return function cleanup() {
          subscription.unsubscribe();
      }
    },[setData]);

    return <BaseComponent {...merge(props, data)} />;
});