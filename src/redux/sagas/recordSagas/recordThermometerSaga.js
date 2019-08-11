import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';


function* getRecordThermometerSaga(action) {
    try {
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/thermometer/?harvest_year_id=${action.payload}`);
        yield put({
            type: 'SET_RECORD_THERMOMETER',
            payload: result.data
        })

    } catch (error) {
        alert(`Sorry! Was unable to get thermometer record! Try again later.`)
    }
}


function* recordThermometerSaga() {
    yield takeLatest('GET_RECORD_THERMOMETER', getRecordThermometerSaga);
}

export default recordThermometerSaga;