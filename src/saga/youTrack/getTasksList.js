import { call, put, takeEvery } from "redux-saga/effects";
import { setIsLogin } from "../../store/actions/authActions";
import {
    setIsTasksListLoading,
    setTasksList,
} from "../../store/actions/tasksPageActions";
import { FETCH_GET_TASKS_LIST } from "../../store/types/tasksPageTypes";

const request = () => {
    let myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        "Bearer perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL"
    );

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    return fetch(
        "https://demo-apptrix.myjetbrains.com/youtrack/api/issues?fields=id,summary,project(name)",
        requestOptions
    );
};

function* getTasksListWorker() {
    yield put(setIsTasksListLoading(true));
    const data = yield call(request);
    const response = yield call(() => new Promise((res) => res(data.json())));
    if (data.status !== 401) {
        yield put(setTasksList(response));
        yield put(setIsTasksListLoading(false));
    } else {
        localStorage.clear();
        setIsLogin(false);
    }
}

export function* getTasksListWatcher() {
    yield takeEvery(FETCH_GET_TASKS_LIST, getTasksListWorker);
}
