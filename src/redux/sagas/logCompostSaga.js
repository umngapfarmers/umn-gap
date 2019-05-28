import axios from 'axios';
import {
    put,
    takeLatest
} from 'redux-saga/effects';


function* addCompostLog(action) {
    try {
        yield axios.post('/log/compost', action.payload);

    } catch (error) {
        console.log('ERROR IN addCompostLog POST', error);
        alert(`Sorry! Was unable to add compost log! Try again later.`)
    }
}


function* addCompostLogSaga() {
    yield takeLatest('ADD_COMPOST_LOG', addCompostLog);

}

export default addCompostLogSaga;
