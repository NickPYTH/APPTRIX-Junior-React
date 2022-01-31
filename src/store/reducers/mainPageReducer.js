import {
    SET_MODAL_IS_VISIBLE,
    SET_USERS_LIST,
    SET_USERS_LIST_IS_LOADING,
} from "../types/mainPageTypes";
import { isVisible } from "@testing-library/user-event/dist/utils";

const INITIAL_STATE = {
    usersList: [],
    isUsersListLoading: false,
    isModalVisible: false,
    userInfoInModal: {},
};

export const mainPageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USERS_LIST:
            return {
                ...state,
                usersList: action.list,
            };
        case SET_USERS_LIST_IS_LOADING:
            return {
                ...state,
                isUsersListLoading: action.value,
            };
        case SET_MODAL_IS_VISIBLE:
            return {
                ...state,
                isModalVisible: action.isVisible,
                userInfoInModal: action.userInfo,
            };
        default:
            return state;
    }
};
