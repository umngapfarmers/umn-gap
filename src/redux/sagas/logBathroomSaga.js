import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getBathroomSaga(action){
    try{
        let result = yield axios.get(`/log/bathroom`, action.payload);
        yield put({type: 'SET_BATHROOM_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get bathroom information! Try again later.`)
    }
}




function* logBathroomSaga() {
  yield takeLatest('GET_BATHROOM', getBathroomSaga);
}

export default logBathroomSaga;
