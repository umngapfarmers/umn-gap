import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFacilityOtherRecordSaga(action){
    try{
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/facilityother/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_FACILITY_OTHER', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get facility other record! Try again later.`)
    }
}


function* recordFacilityOtherSaga() {
  yield takeLatest('GET_RECORD_FACILITY_OTHER', getFacilityOtherRecordSaga);
}

export default recordFacilityOtherSaga;
