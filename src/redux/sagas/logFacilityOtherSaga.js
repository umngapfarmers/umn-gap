import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFacilityOtherSaga(action){
    try{
        let result = yield axios.get(`/log/facilityother`);
        yield put({type: 'SET_FACILITY_OTHER_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get facility other information! Try again later.`)
    }
}

function* addFacilityOtherSaga(action){
    try{
        let result = yield axios.post(`/log/facilityother/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit facility other maintenance log! Try again later.`)
    }
}




function* logFacilityOtherSaga() {
  yield takeLatest('GET_FACILITY_OTHER', getFacilityOtherSaga);
  yield takeLatest('ADD_FACILITY_OTHER_LOG', addFacilityOtherSaga)
}

export default logFacilityOtherSaga;
