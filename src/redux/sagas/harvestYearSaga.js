import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* GetHarvestYearSaga() {
    try {
        const hYear = yield axios.get("/hyear");
        yield put({ type: "SET_HARVEST_YEAR", payload: hYear.data });
    } catch (err) {
    }
}

function* harvestYearSaga() {
    yield takeLatest("FETCH_HARVEST_YEAR", GetHarvestYearSaga);
}

export default harvestYearSaga;