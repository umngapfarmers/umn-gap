import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getToolSaga(action){
    try{
        let result = yield axios.get(`/log/tool`);
        yield put({type: 'SET_TOOL_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get tool information! Try again later.`)
    }
}

function* addToolSaga(action){
    try{
        let result = yield axios.post(`/log/tool/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit tool maintenance log! Try again later.`)
    }
}




function* logToolSaga() {
  yield takeLatest('GET_TOOL', getToolSaga);
  yield takeLatest('ADD_TOOL_LOG', addToolSaga)
}

export default logToolSaga;
