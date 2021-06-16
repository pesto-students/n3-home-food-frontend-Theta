import { combineReducers } from 'redux';
import initialState from '../data/initialState';


const isAdminLoggedIn = (state = initialState.isUserLoggedIn, action) => {
    if (action.type === 'ADMIN_LOGGED') {
        return action.value;
    }
    return state;
}

export default combineReducers({
    isAdminLoggedIn
});