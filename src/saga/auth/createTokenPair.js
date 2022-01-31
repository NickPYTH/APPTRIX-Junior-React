import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_CREATE_TOKENS_PAIR } from "../../store/types/authTypes";
import {
    isLoginRequestLoading,
    setIsLogin,
    setLoginError,
} from "../../store/actions/authActions";

const request = (username, password) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch("http://erp.apptrix.ru/api/token/", requestOptions);
};

function* tokensPairCreateWorker(credentials) {
    yield put(isLoginRequestLoading(true));
    const data = yield call(
        request,
        credentials.username,
        credentials.password
    );
    const response = yield call(() => new Promise((res) => res(data.json())));
    yield put(isLoginRequestLoading(false));
    if (data.status === 401) {
        localStorage.clear();
        yield put(setLoginError(true));
    } else {
        localStorage.setItem("accessToken", response.access);
        localStorage.setItem("refreshToken", response.refresh);
        yield put(setLoginError(false));
        yield put(setIsLogin(true));
    }
}

export function* tokensPairCreateWatcher() {
    yield takeEvery(FETCH_CREATE_TOKENS_PAIR, tokensPairCreateWorker);
}
