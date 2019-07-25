import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* checkEmailSaga(action) {
    try {
        yield axios.get(`passwordRecovery/checkEmail/?email=${action.payload}`);
        yield put({type: 'CHECK_EMAIL_SUCCESS'});
    }
    catch (error) {
        if (error.response.status === 401){
        yield put({type: "CHECK_EMAIL_ERROR"});
        }
    }
}

function* updatePasswordPut(action) {
    try {
        yield axios.put(`passwordRecovery/resetPassword`, action.payload);
    }
    catch (error) {
        alert(`Sorry, unable to change password. Try again!`);
    }
}




function* passwordRecoverySaga() {
  yield takeLatest('CHECK_EMAIL', checkEmailSaga);
  yield takeLatest('UPDATE_PASSWORD', updatePasswordPut);
  
}

export default passwordRecoverySaga;
