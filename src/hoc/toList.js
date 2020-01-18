import React from 'react';
import { curry } from 'ramda';

const toList = curry((options, BaseComponent) => (props) => {
    const {className} = options;
    return (
        <div className={className}>
            {props.accounts.map((data, i) => {
                const k = String(data.id || i);
                return <BaseComponent dispatch={props.dispatch} {...data} key={k} />
            })}
        </div>
    )
});

export default toList;