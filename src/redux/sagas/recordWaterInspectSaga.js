import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getWaterRecordInspectSaga(action){
    try{
        let result = yield axios.get(`/record/waterinspect/?harvest_year=${action.payload}`);
        yield put({type: 'SET_RECORD_WATER_INSPECT', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get water inspection record! Try again later.`)
    }
}


function* recordWaterInspectSaga() {
  yield takeLatest('GET_RECORD_WATER_INSPECT', getWaterRecordInspectSaga);
}

export default recordWaterInspectSaga;
