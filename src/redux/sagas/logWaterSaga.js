import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addLogWaterInspect(action){
    console.log('in addLogWaterInspect')
    try{
        let result = yield axios.post(`/log/water/inspect`, action.payload)
    }
    catch (error){
        console.log('ERROR IN WATER INSPECTION LOG POST', error);
        alert(`Sorry! Was unable to add water inspection log! Try again later.`)
    }
}



function* logWaterSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('ADD_RECORD_WATER_INSPECT', addLogWaterInspect);
}

export default logWaterSaga;
