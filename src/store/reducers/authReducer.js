import {
    IS_LOGIN_REQUEST_LOADING,
    SET_IS_LOGIN,
    SET_LOGIN_ERROR,
} from "../types/authTypes";

const INITIAL_STATE = {
    isLogin: false,
    isLoginRequestLoading: false,
    loginError: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.value,
            };
        case IS_LOGIN_REQUEST_LOADING:
            return {
                ...state,
                isLoginRequestLoading: action.value,
            };
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.value,
            };
        default:
            return state;
    }
};
