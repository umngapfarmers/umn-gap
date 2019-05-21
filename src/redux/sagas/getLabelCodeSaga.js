import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getLabelCode(action) {
    console.log('in getLabelCodeSaga', action.payload)
    try {
        let result = yield axios.get(`/setup/label_code/${action.payload.harvest_year_id}`)
        console.log(`result label codes `, result.data);

        yield put({ type: "SET_LABEL_CODE", payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN getLabelCodeSaga GET', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* addLabelCode(action) {
    console.log('Hit the addLabelCode', action.payload);

    try {
        yield axios.post(`/api/setup/label_code`, action.payload);
        yield put({ type: 'GET_LABEL_CODE' });
    }
    catch (error) {
        console.log(`Couldn't add the label code`, action.payload, error);
        alert(`Sorry, couldn't add the labelcode. Try again later`);
    }
}

function* getLabelCodeSaga() {
    //   yield takeLatest('ADD_FARM', addFarmSaga);
    yield takeLatest('GET_LABEL_CODE', getLabelCode);
    yield takeLatest('ADD_LABEL_CODE', addLabelCode);
}

export default getLabelCodeSaga;