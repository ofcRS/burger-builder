import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const store = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                error: null,
                loading: true
            };
        case (actionTypes.AUTH):
            return {
                ...state,
                error: null,
                userId: action.userId,
                token: action.token,
                loading: false
            };
        case (actionTypes.AUTH_FAIL):
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case (actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                userId: null,
                token: null
            };
        case (actionTypes.SET_AUTH_REDIRECT_PATH):
            return {
                ...state,
                authRedirectPath: action.path
            };
        default:
            return state;
    }
};

export default store;
