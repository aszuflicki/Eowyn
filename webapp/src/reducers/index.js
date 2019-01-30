import { combineReducers } from 'redux';
import auth from './Auth.reducer'
import dashboard from './Dashboard.reducer'
import discussion from './Discussion.reducer'

export default combineReducers({
    auth,
    dashboard,
    discussion
});