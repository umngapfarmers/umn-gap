import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';


function* getRecordVehicleSaga(action) {
    try {
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/vehicle/?harvest_year_id=${action.payload}`);
        yield put({
            type: 'SET_RECORD_VEHICLE',
            payload: result.data
        })

    } catch (error) {
        alert(`Sorry! Was unable to get vehicle record! Try again later.`)
    }
}


function* recordVehicleSaga() {
    yield takeLatest('GET_RECORD_VEHICLE', getRecordVehicleSaga);
}

export default recordVehicleSaga;