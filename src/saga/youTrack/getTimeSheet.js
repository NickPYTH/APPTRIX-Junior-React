import { call, put, takeEvery } from "redux-saga/effects";
import {
    setUsersList,
    setUsersListIsLoading,
} from "../../store/actions/mainPageActions";
import { setIsLogin } from "../../store/actions/authActions";
import { FETCH_GET_TIME_SHEET } from "../../store/types/timeSheetPageTypes";
import {
    setIsWorkItemsListLoading,
    setWorkItemsList,
} from "../../store/actions/timeSheetPageActions";

const request = (id) => {
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
        `https://demo-apptrix.myjetbrains.com/youtrack/api/issues/${id}/timeTracking/workItems?fields=id,duration(presentation,minutes),author(name)`,
        requestOptions
    );
};

function* getTimeSheetWorker(params) {
    yield put(setIsWorkItemsListLoading(true));
    const data = yield call(request, params.id);
    const response = yield call(() => new Promise((res) => res(data.json())));
    if (data.status !== 401) {
        yield put(setWorkItemsList(response));
        yield put(setIsWorkItemsListLoading(false));
    } else {
        localStorage.clear();
        setIsLogin(false);
    }
}

export function* getTimeSheetWatcher() {
    yield takeEvery(FETCH_GET_TIME_SHEET, getTimeSheetWorker);
}
