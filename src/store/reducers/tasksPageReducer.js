import {
    SET_AUTOCOMPLETE_TASKS_LIST,
    SET_IS_TASKS_LIST_LOADING,
    SET_TASKS_LIST,
} from "../types/tasksPageTypes";

const INITIAL_STATE = {
    tasksList: [],
    isTaskListLoading: false,
    autoCompleteList: [],
};

export const tasksPageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AUTOCOMPLETE_TASKS_LIST:
            return {
                ...state,
                autoCompleteList: action.list,
            };
        case SET_TASKS_LIST:
            return {
                ...state,
                tasksList: action.tasksList,
            };
        case SET_IS_TASKS_LIST_LOADING:
            return {
                ...state,
                isTaskListLoading: action.value,
            };
        default:
            return state;
    }
};
