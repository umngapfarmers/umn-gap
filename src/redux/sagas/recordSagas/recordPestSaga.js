import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';


function* getRecordPestSaga(action) {
    try {
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/pest/?harvest_year_id=${action.payload}`);
        yield put({
            type: 'SET_RECORD_PEST',
            payload: result.data
        })

    } catch (error) {
        alert(`Sorry! Was unable to get pest record! Try again later.`)
    }
}


function* recordPestSaga() {
    yield takeLatest('GET_RECORD_PEST', getRecordPestSaga);
}

export default recordPestSaga;