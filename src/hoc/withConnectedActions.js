import { curry } from 'ramda';
import { connect } from 'react-redux';
import * as actions from '../actions'

export default curry((connect, actions, actionsToConnect) => {
    return connect(null, actionsToConnect.reduce((acc, curr) => {
        return {...acc, [curr]: actions[curr]}
    }, {}))
})(connect, actions);