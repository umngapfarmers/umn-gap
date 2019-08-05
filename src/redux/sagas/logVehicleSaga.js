import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getVehicleSaga(action){
    try{
        let result = yield axios.get(`/log/vehicle`);
        yield put({type: 'SET_VEHICLE_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get vehicle information! Try again later.`)
    }
}

function* addVehicleSaga(action){
    try{
        let result = yield axios.post(`/log/vehicle/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit vehicle maintenance log! Try again later.`)
    }
}




function* logVehicleSaga() {
  yield takeLatest('GET_VEHICLE', getVehicleSaga);
  yield takeLatest('ADD_VEHICLE_LOG', addVehicleSaga)
}

export default logVehicleSaga;
