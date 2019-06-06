import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getAllUsersSaga(action){
    try{
        let result = yield axios.get(`/superadmin`)
        
        yield put({type: "SET_ALL_USERS", payload: result.data})
        
    }
    catch (error){
        alert(`Sorry! Was unable to get all users! Try again later.`)
    }
}

function* editAllUsersSaga(action){
    try{
        yield axios.put(`/superadmin/${action.payload.user_id}`, action.payload);
    }
    catch (error) {
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}

function* allUsersSaga() {
  yield takeLatest('GET_ALL_USERS', getAllUsersSaga);
  yield takeLatest('EDIT_USER', editAllUsersSaga)
}

export default allUsersSaga;
