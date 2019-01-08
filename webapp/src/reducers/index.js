import { combineReducers } from 'redux';
import auth from './Auth.reducer'
import dashboard from './Dashboard.reducer'

export default combineReducers({
    auth,
    dashboard
});