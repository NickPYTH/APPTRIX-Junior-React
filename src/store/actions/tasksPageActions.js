import {
    FETCH_GET_TASKS_AUTOCOMPLETE,
    FETCH_GET_TASKS_LIST,
    SET_AUTOCOMPLETE_TASKS_LIST,
    SET_IS_TASKS_LIST_LOADING,
    SET_TASKS_LIST,
} from "../types/tasksPageTypes";

export const fetchGetTasksList = () => ({
    type: FETCH_GET_TASKS_LIST,
});

export const setIsTasksListLoading = (value) => ({
    type: SET_IS_TASKS_LIST_LOADING,
    value,
});

export const setTasksList = (tasksList) => ({
    type: SET_TASKS_LIST,
    tasksList,
});

export const setAutoCompleteTasksList = (list) => ({
    type: SET_AUTOCOMPLETE_TASKS_LIST,
    list,
});

export const fetchGetTasksAutocomplete = (value) => ({
    type: FETCH_GET_TASKS_AUTOCOMPLETE,
    value,
});
