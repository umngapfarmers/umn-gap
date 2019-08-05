import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPestSaga(action){
    try{
        let result = yield axios.get(`/log/pest`);
        yield put({type: 'SET_PEST_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get pest information! Try again later.`)
    }
}

function* addPestSaga(action){
    try{
        let result = yield axios.post(`/log/pest/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit pest maintenance log! Try again later.`)
    }
}




function* logPestSaga() {
  yield takeLatest('GET_PEST', getPestSaga);
  yield takeLatest('ADD_PEST_LOG', addPestSaga)
}

export default logPestSaga;
