import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getThermometerSaga(action){
    try{
        let result = yield axios.get(`/log/thermometer`);
        yield put({type: 'SET_THERMOMETER_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get thermometer information! Try again later.`)
    }
}

function* addThermometerSaga(action){
    try{
        let result = yield axios.post(`/log/thermometer/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit thermometer maintenance log! Try again later.`)
    }
}




function* logThermometerSaga() {
  yield takeLatest('GET_THERMOMETER', getThermometerSaga);
  yield takeLatest('ADD_THERMOMETER_LOG', addThermometerSaga)
}

export default logThermometerSaga;
