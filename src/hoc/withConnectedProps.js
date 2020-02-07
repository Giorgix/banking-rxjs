import { curry } from 'ramda';
import { connect } from 'react-redux';

export default curry((connect, propsToConnect) => {
    return connect(state => propsToConnect.reduce((acc, curr) => {
        return {...acc, [curr]: state[curr]}
    }, {}))
})(connect);