import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addEmployeeLogSaga(action){
    try{
        let result = yield axios.post(`/log/employee/add`, action.payload)
     
    }
    catch (error){
        alert(`Sorry! Was unable to add employee training log. Try again later.`)
    }
}

function* employeeLogSaga() {
  yield takeLatest('ADD_EMPLOYEE_LOG', addEmployeeLogSaga);
}

export default employeeLogSaga;
