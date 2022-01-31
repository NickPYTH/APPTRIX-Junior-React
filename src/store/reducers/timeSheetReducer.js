import {
    SET_IS_WORK_ITEMS_LIST_LOADING,
    SET_WORK_ITEMS_LIST,
} from "../types/timeSheetPageTypes";

const INITIAL_STATE = {
    isWorkItemsListLoading: false,
    workItemsList: [],
};

export const timeSheetReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_WORK_ITEMS_LIST_LOADING:
            return {
                ...state,
                isWorkItemsListLoading: action.value,
            };
        case SET_WORK_ITEMS_LIST:
            return {
                ...state,
                workItemsList: action.list,
            };
        default:
            return state;
    }
};
