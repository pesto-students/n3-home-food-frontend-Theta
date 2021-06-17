import { combineReducers } from 'redux';
import initialState from '../data/initialState';
import landing from '../data/landing';

const isAdminLoggedIn = (state = initialState.isUserLoggedIn, action) => {
    if (action.type === 'ADMIN_LOGGED') {
        return action.value;
    }
    return state;
}


export default combineReducers({
    isAdminLoggedIn,
    landing
});