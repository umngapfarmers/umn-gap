import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPersonSaga(action){
    try{
        let result = yield axios.get(`/log/harvest/person`)
        
        yield put({type: "SET_PERSON", payload: result.data})
        
    }
    catch (error){
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}


function* personSaga() {
  yield takeLatest('GET_PERSON', getPersonSaga);
  
}

export default personSaga;
