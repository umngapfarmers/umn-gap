import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getBathroomSaga(action){
    try{
        let result = yield axios.get(`/log/bathroom`);
        yield put({type: 'SET_BATHROOM_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get bathroom information! Try again later.`)
    }
}

function* addBathroomLogSaga(action){
    try{
        let result = yield axios.post(`/log/bathroom/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit bathroom maintenance log! Try again later.`)
    }
}




function* logBathroomSaga() {
  yield takeLatest('GET_BATHROOM', getBathroomSaga);
  yield takeLatest('ADD_BATHROOM_LOG', addBathroomLogSaga)
}

export default logBathroomSaga;
