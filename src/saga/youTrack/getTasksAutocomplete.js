import { call, put, takeEvery } from "redux-saga/effects";
import { setIsLogin } from "../../store/actions/authActions";
import {
    setAutoCompleteTasksList,
    setIsTasksListLoading,
    setTasksList,
} from "../../store/actions/tasksPageActions";
import { FETCH_GET_TASKS_AUTOCOMPLETE } from "../../store/types/tasksPageTypes";

const request = (value) => {
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
        `https://demo-apptrix.myjetbrains.com/youtrack/api/issues?fields=id,summary,project(name)&query=project:+%7B${value}*%7D`,
        requestOptions
    );
};

function* getTasksAutocompleteWorker(info) {
    const data = yield call(request, info.value);
    let response = yield call(() => new Promise((res) => res(data.json())));
    if (data.status === 400) {
        yield put(setAutoCompleteTasksList([]));
    } else {
        if (data.status !== 401) {
            response = response.map((record) => ({
                ...record,
                label: record.project.name,
            }));
            yield put(setAutoCompleteTasksList(response));
        } else {
            localStorage.clear();
            setIsLogin(false);
        }
    }
}

export function* getTasksAutocompleteWatcher() {
    yield takeEvery(FETCH_GET_TASKS_AUTOCOMPLETE, getTasksAutocompleteWorker);
}
