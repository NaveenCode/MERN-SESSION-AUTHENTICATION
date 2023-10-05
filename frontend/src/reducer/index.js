import { combineReducers } from 'redux';
import authReducer from './SignupReducer';


const reducer = combineReducers({
    auth: authReducer,
    // Add other reducers here if needed
});

export default reducer;