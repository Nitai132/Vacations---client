import { combineReducers } from 'redux';
import authentication from './loginReducer.js';
import userDetails from './userDetailsReducer';

export default combineReducers({
    authentication,
    userDetails
});