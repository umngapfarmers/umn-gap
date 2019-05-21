import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPersonSaga(getPersonSaga){
    console.log('in getPersonSaga')
    try{
        let result = yield axios.get(`/log/harvest/person`)
        console.log(`result label codes `, result.data);
        
        yield put({type: "SET_PERSON", payload: result.data})
        
    }
    catch (error){
        console.log('ERROR IN getPersonSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* personSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_LABEL_CODE', getPersonSaga);
}

export default personSaga;
