import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getCoolerRecordSaga(action){
    try{
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/cooler/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_COOLER', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get cooler record! Try again later.`)
    }
}


function* recordCoolerSaga() {
  yield takeLatest('GET_RECORD_COOLER', getCoolerRecordSaga);
}

export default recordCoolerSaga;
