import React from 'react';
import {curry, merge} from 'ramda';

export default curry((storeDispatcher, BaseComponent) => props => {


    return <BaseComponent {...props} dispatch={storeDispatcher} />;
});