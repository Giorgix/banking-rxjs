import React, {useState, useEffect} from 'react';
import {curry, merge} from 'ramda';

export default curry((store, pipeOperators, BaseComponent) => props => {

    const [data, setData] = useState({
        isFetching: true,
        didInvalidate: false
    });

    useEffect(() => {
      const subscription = store.pipe(
        ...pipeOperators,
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