import {
    FETCH_GET_TIME_SHEET,
    SET_IS_WORK_ITEMS_LIST_LOADING,
    SET_WORK_ITEMS_LIST,
} from "../types/timeSheetPageTypes";

export const fetchGetTimeSheet = (id) => ({
    type: FETCH_GET_TIME_SHEET,
    id,
});

export const setWorkItemsList = (list) => ({
    type: SET_WORK_ITEMS_LIST,
    list,
});

export const setIsWorkItemsListLoading = (value) => ({
    type: SET_IS_WORK_ITEMS_LIST_LOADING,
    value,
});
