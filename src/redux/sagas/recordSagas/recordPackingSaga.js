import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPackingRecordSaga(action){
    try{
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/packing/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_PACKING', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get packing record! Try again later.`)
    }
}


function* recordPackingSaga() {
  yield takeLatest('GET_RECORD_PACKING', getPackingRecordSaga);
}

export default recordPackingSaga;
