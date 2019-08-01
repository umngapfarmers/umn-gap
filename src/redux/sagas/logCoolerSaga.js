import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getCoolerSaga(action){
    try{
        let result = yield axios.get(`/log/cooler`);
        yield put({type: 'SET_COOLER_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get cooler information! Try again later.`)
    }
}

function* addCoolerSaga(action){
    try{
        let result = yield axios.post(`/log/cooler/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit cooler maintenance log! Try again later.`)
    }
}




function* logCoolerSaga() {
  yield takeLatest('GET_COOLER', getCoolerSaga);
  yield takeLatest('ADD_COOLER_LOG', addCoolerSaga)
}

export default logCoolerSaga;
