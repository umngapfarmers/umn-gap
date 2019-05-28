import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getCropRecordSaga(action){
    console.log('in getCropRecordSaga')
    try{
        let result = yield axios.get(`/record/harvest/crop/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_CROP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET RECORD CROP ', error);
        alert(`Sorry! Was unable to get crop, fields and label codes record! Try again later.`)
    }
}


function* recordCropSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_RECORD_CROP', getCropRecordSaga);
}

export default recordCropSaga;
