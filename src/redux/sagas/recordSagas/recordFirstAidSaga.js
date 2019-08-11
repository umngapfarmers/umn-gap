import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFirstAidRecordSaga(action){
    try{
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/firstaid/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_FIRSTAID', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get first aid record! Try again later.`)
    }
}


function* recordFirstAidSaga() {
  yield takeLatest('GET_RECORD_FIRSTAID', getFirstAidRecordSaga);
}

export default recordFirstAidSaga;
