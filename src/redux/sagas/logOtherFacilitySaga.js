import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOtherFacilitySaga(action){
    try{
        let result = yield axios.get(`/log/otherfacility`);
        yield put({type: 'SET_OTHER_FACILITY_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get otherfacility information! Try again later.`)
    }
}

function* addOtherFacilitySaga(action){
    try{
        let result = yield axios.post(`/log/otherfacility/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit otherfacility maintenance log! Try again later.`)
    }
}




function* logOtherFacilitySaga() {
  yield takeLatest('GET_OTHER_FACILITY', getOtherFacilitySaga);
  yield takeLatest('ADD_OTHER_FACILITY_LOG', addOtherFacilitySaga)
}

export default logOtherFacilitySaga;
