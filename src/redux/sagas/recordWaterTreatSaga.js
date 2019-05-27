import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getWaterRecordTreatSaga(action){
    console.log('in getWaterRecordTreatSaga')
    try{
        let result = yield axios.get(`/record/watertreat/?harvest_year=${action.payload}`);
        yield put({type: 'SET_RECORD_WATER_TREAT', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET RECORD TREAT ', error);
        alert(`Sorry! Was unable to get water treatment record! Try again later.`)
    }
}


function* recordWaterTreatSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_RECORD_WATER_TREAT', getWaterRecordTreatSaga);
}

export default recordWaterTreatSaga;
