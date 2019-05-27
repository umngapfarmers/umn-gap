import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getWaterRecordInspectSaga(action){
    console.log('in getWaterRecordInspectSaga')
    try{
        let result = yield axios.get(`/record/waterinspect/?harvest_year=${action.payload}`);
        yield put({type: 'SET_RECORD_WATER_INSPECT', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET RECORD INSPECT ', error);
        alert(`Sorry! Was unable to get water inspection record! Try again later.`)
    }
}


function* recordWaterInspectSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_RECORD_WATER_INSPECT', getWaterRecordInspectSaga);
}

export default recordWaterInspectSaga;
