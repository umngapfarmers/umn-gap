import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* checkEmailSaga(action) {
    try {
        yield axios.get(`/checkEmail/?email=${action.payload}`);
    }
    catch (error) {
        alert(`Sorry, that email does not exist. Try again!`);
    }
}


function* passwordRecoverySaga() {
  yield takeLatest('CHECK_EMAIL', checkEmailSaga);
  
}

export default passwordRecoverySaga;
