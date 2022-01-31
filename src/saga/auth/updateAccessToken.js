import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_UPDATE_ACCESS_TOKEN } from "../../store/types/authTypes";
import {
    isLoginRequestLoading,
    setIsLogin,
} from "../../store/actions/authActions";

const request = (token) => {
    let myHeaders = new Headers();
    let formData = new FormData();
    formData.append("refresh", token);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
    };

    return fetch("http://erp.apptrix.ru/api/token/refresh/", requestOptions);
};

function* updateAccessTokenWorker(params) {
    yield put(isLoginRequestLoading(true));
    const data = yield call(request, params.token);
    yield put(isLoginRequestLoading(false));
    const response = yield call(() => new Promise((res) => res(data.json())));
    if (data.status === 401) {
        localStorage.clear();
    } else {
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response.access);
    }
}

export function* updateAccessTokenWatcher() {
    yield takeEvery(FETCH_UPDATE_ACCESS_TOKEN, updateAccessTokenWorker);
}
