import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getFirstAidSaga(action){
    try{
        let result = yield axios.get(`/log/firstaid`);
        yield put({type: 'SET_FIRSTAID_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get firstaid information! Try again later.`)
    }
}

function* addFirstAidSaga(action){
    try{
        let result = yield axios.post(`/log/firstaid/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit firstaid maintenance log! Try again later.`)
    }
}




function* logFirstAidSaga() {
  yield takeLatest('GET_FIRSTAID', getFirstAidSaga);
  yield takeLatest('ADD_FIRSTAID_LOG', addFirstAidSaga)
}

export default logFirstAidSaga;
