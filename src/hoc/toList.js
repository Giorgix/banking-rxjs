import React from 'react';
import { curry } from 'ramda';

const toList = curry((options, iterableProp, BaseComponent) => (props) => {
    const {className} = options;
    return (
        <ul className={className}>
            {props[iterableProp].map((data, i) => {
                const k = String(data.id || i);
                return <BaseComponent {...props} {...data} key={k} />
            })}
        </ul>
    )
});

export default toList;