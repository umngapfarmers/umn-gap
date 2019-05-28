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
        alert(`Sorry! Was unable to get all uesrs! Try again later.`)
    }
}


function* allUsersSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_ALL_USERS', getAllUsersSaga);
  
}

export default allUsersSaga;
