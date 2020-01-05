import React from 'react';
import { curry } from 'ramda';

export default curry((condition, Left, Right) => props =>
    condition(props) ? <Left {...props} /> : <Right {...props} />
);