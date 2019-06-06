import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getManureRecordSaga(action){
    try{
        let result = yield axios.get(`/record/manure/?harvest_year=${action.payload}`);
        yield put({type: 'SET_RECORD_MANURE', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get manure record! Try again later.`)
    }
}


function* recordManureSaga() {
  yield takeLatest('GET_RECORD_MANURE', getManureRecordSaga);
}

export default recordManureSaga;
