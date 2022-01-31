import { all } from "redux-saga/effects";
import { tokensPairCreateWatcher } from "./auth/createTokenPair";
import { verifyAccessTokenWatcher } from "./auth/verifyAccessToken";
import { updateAccessTokenWatcher } from "./auth/updateAccessToken";
import { getUsersLisWatcher } from "./youTrack/getUsersList";
import { getTasksListWatcher } from "./youTrack/getTasksList";
import { getTasksAutocompleteWatcher } from "./youTrack/getTasksAutocomplete";
import { getTimeSheetWatcher } from "./youTrack/getTimeSheet";

export function* rootWatcher() {
    yield all([
        tokensPairCreateWatcher(),
        verifyAccessTokenWatcher(),
        updateAccessTokenWatcher(),
        getUsersLisWatcher(),
        getTasksListWatcher(),
        getTasksAutocompleteWatcher(),
        getTimeSheetWatcher(),
    ]);
}
