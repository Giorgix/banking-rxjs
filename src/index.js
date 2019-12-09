import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import * as serviceWorker from './serviceWorker';

interval(1000).pipe(
    map(value => ({checking: value, savings: value}))
).subscribe(props =>
    ReactDOM.render(
        <App {...props}/>,
        document.getElementById('root')
    )
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();