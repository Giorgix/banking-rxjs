import React from 'react';
import { curry, pick } from 'ramda';

export default curry((propsToPick, BaseComponent) => props => {
    const newProps = pick(propsToPick, props);
    return <BaseComponent {...newProps} />;
});