import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPackingSaga(action){
    try{
        let result = yield axios.get(`/log/packing`);
        yield put({type: 'SET_PACKING_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get packing information! Try again later.`)
    }
}

function* addPackingSaga(action){
    try{
        let result = yield axios.post(`/log/packing/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit packing maintenance log! Try again later.`)
    }
}




function* logPackingSaga() {
  yield takeLatest('GET_PACKING', getPackingSaga);
  yield takeLatest('ADD_PACKING_LOG', addPackingSaga)
}

export default logPackingSaga;