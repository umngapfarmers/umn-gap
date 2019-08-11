import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getEmployeeRecordSaga(action){
    try{
        let result = yield axios.get(`/record/employee?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_EMPLOYEE', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get employee training record! Try again later.`)
    }
}


function* recordEmployeeSaga() {
  yield takeLatest('GET_RECORD_EMPLOYEE', getEmployeeRecordSaga);
}

export default recordEmployeeSaga;
