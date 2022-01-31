import {
    FETCH_CREATE_TOKENS_PAIR,
    FETCH_UPDATE_ACCESS_TOKEN,
    FETCH_VERIFY_ACCESS_TOKEN,
    IS_LOGIN_REQUEST_LOADING,
    SET_IS_LOGIN,
    SET_LOGIN_ERROR,
} from "../types/authTypes";

export const fetchCreateTokensPair = (username, password) => ({
    type: FETCH_CREATE_TOKENS_PAIR,
    username,
    password,
});

export const setLoginError = (value) => ({
    type: SET_LOGIN_ERROR,
    value,
});

export const fetchUpdateAccessToken = (token) => ({
    type: FETCH_UPDATE_ACCESS_TOKEN,
    token,
});

export const fetchVerifyAccessToken = (token) => ({
    type: FETCH_VERIFY_ACCESS_TOKEN,
    token,
});

export const setIsLogin = (value) => ({
    type: SET_IS_LOGIN,
    value,
});

export const isLoginRequestLoading = (value) => ({
    type: IS_LOGIN_REQUEST_LOADING,
    value,
});
