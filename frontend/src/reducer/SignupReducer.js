const initialState = {
    user: null,
    error: null, // Store error messages if signup fails
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload,
                error: null, // Clear any previous error
            };
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                user: null,
                error: action.payload, // Store the error message
            };
        default:
            return state;
    }
};

export default authReducer;