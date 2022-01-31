import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_USERS_LIST } from "../../store/types/mainPageTypes";
import {
    setUsersList,
    setUsersListIsLoading,
} from "../../store/actions/mainPageActions";
import { setIsLogin } from "../../store/actions/authActions";

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
        "https://demo-apptrix.myjetbrains.com/youtrack/api/admin/users?fields=id,login,name,email",
        requestOptions
    );
};

function* getUsersListWorker() {
    yield put(setUsersListIsLoading(true));
    const data = yield call(request);
    const response = yield call(() => new Promise((res) => res(data.json())));
    if (data.status !== 401) {
        yield put(setUsersList(response));
        yield put(setUsersListIsLoading(false));
    } else {
        localStorage.clear();
        setIsLogin(false);
    }
}

export function* getUsersLisWatcher() {
    yield takeEvery(FETCH_GET_USERS_LIST, getUsersListWorker);
}
