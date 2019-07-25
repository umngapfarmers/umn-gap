import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getHarvestRecord(action){
    try{
        let result = yield axios.get(`/record/harvest?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_HARVEST', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get harvest record! Try again later.`)
    }
}


function* recordHarvestSaga() {
  yield takeLatest('GET_RECORD_HARVEST', getHarvestRecord);
}

export default recordHarvestSaga;
