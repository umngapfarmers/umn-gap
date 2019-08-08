import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getBathroomRecordSaga(action){
    try{
        let result = yield axios.get(`/record/harvest/bathroom/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_BATHROOM', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get bathroom record! Try again later.`)
    }
}


function* recordBathroomSaga() {
  yield takeLatest('GET_RECORD_BATHROOM', getBathroomRecordSaga);
}

export default recordBathroomSaga;
