import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_VERIFY_ACCESS_TOKEN } from "../../store/types/authTypes";
import {
    fetchUpdateAccessToken,
    isLoginRequestLoading,
    setIsLogin,
} from "../../store/actions/authActions";

const request = (token) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    return fetch(
        "http://erp.apptrix.ru/projects/project/list/",
        requestOptions
    );
};

function* verifyAccessTokenWorker(params) {
    yield put(isLoginRequestLoading(true));
    const data = yield call(request, params.token);
    yield put(isLoginRequestLoading(false));
    if (data.status === 401) {
        yield put(fetchUpdateAccessToken(localStorage.getItem("refreshToken")));
    } else {
        yield put(setIsLogin(true));
    }
}

export function* verifyAccessTokenWatcher() {
    yield takeEvery(FETCH_VERIFY_ACCESS_TOKEN, verifyAccessTokenWorker);
}
