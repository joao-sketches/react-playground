import {SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_ERROR} from '../actions';

 function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') != null
}, action) {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.credentials
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ""
            };
        case SIGNIN_ERROR:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            };
        default:
            return state;

    }
}

export default auth;
