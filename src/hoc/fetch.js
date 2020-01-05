import {merge, curry} from 'ramda';
import React, {useState, useEffect} from 'react';

const delay = t => new Promise(resolve => setTimeout(resolve, t));

export default curry((url, mapper, BaseComponent) => props => {
    const status = {loading: true, completed: false};
    const initialState = merge(props, status);
    const [data, changeState] = useState(initialState);

    const fetchData = async () => {
        await delay(Math.trunc(Math.random() * (3000 - 250) + 250));
        await fetch(url(props))
            .then(res => res.json())
            .then(mapper)
            .then(merge({loading: false, completed: true}))
            .then(console.log)
            .then(changeState)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return <BaseComponent {...props} {...data} />;
});