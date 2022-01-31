import {
    FETCH_GET_USERS_LIST,
    SET_MODAL_IS_VISIBLE,
    SET_USERS_LIST,
    SET_USERS_LIST_IS_LOADING,
} from "../types/mainPageTypes";

export const fetchGetUsersList = () => ({
    type: FETCH_GET_USERS_LIST,
});

export const setUsersList = (list) => ({
    type: SET_USERS_LIST,
    list,
});

export const setUsersListIsLoading = (value) => ({
    type: SET_USERS_LIST_IS_LOADING,
    value,
});

export const setModalIsVisible = (isVisible, userInfo) => ({
    type: SET_MODAL_IS_VISIBLE,
    isVisible,
    userInfo,
});
