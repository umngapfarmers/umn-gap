import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getAllUsersSaga(action){
    console.log('in getAllUsersSaga')
    try{
        let result = yield axios.get(`/superadmin`)
        console.log(`result getAllUsers `, result.data);
        
        yield put({type: "SET_ALL_USERS", payload: result.data})
        
    }
    catch (error){
        console.log('ERROR IN getAllUsersSaga', error);
        alert(`Sorry! Was unable to get all users! Try again later.`)
    }
}

function* editAllUsersSaga(action){
    console.log('in editAllUsersSaga')
    try{
        yield axios.put(`/superadmin/${action.payload.user_id}`, action.payload);
    }
    catch (error) {
        console.log('ERROR IN editAllUsersSaga', error);
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}

function* allUsersSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_ALL_USERS', getAllUsersSaga);
  yield takeLatest('EDIT_USER', editAllUsersSaga)
}

export default allUsersSaga;
