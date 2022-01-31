import { rootWatcher } from "../saga/mergeWatchers";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { mainPageReducer } from "./reducers/mainPageReducer";
import { tasksPageReducer } from "./reducers/tasksPageReducer";
import { timeSheetReducer } from "./reducers/timeSheetReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    authReducer,
    mainPageReducer,
    tasksPageReducer,
    timeSheetReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
