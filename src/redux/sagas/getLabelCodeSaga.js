import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getLabelCode(action){
    try{
        let result = yield axios.get(`/setup/label_code/`)
        yield put({type: "SET_LABEL_CODE", payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* addLabelCode(action) {

    try {
        yield axios.post(`/setup/label_code`, action.payload);
        yield put({ type: 'GET_LABEL_CODE' });
    }
    catch (error) {
        alert(`Sorry, couldn't add the labelcode. Try again later`);
    }
}

function* deleteLabelCode(action) {

    try {
        yield axios.delete(`/setup/label_code/${action.payload}`);

        yield put({ type: 'GET_LABEL_CODE' });
    }
    catch (error) {
        alert(`Sorry, couldn't delete your labelCode. Try again later`);
    }
}

function* disableLabelCode(action) {

    try {
        yield axios.put(`/setup/label_code/disable`, action.payload);

        yield put({ type: 'GET_LABEL_CODE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your lable. Try again later`);
    }
}

function* editLabelCode(action) {

    try {
        yield axios.put(`/setup/label_code/edit`, action.payload);

        yield put({ type: 'GET_LABEL_CODE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your label. Try again later`);
    }
}

function* getLabelCodeSaga() {
    yield takeLatest('GET_LABEL_CODE', getLabelCode);
    yield takeLatest('ADD_LABEL_CODE', addLabelCode);
    yield takeLatest('DELETE_LABEL_CODE', deleteLabelCode);
    yield takeLatest('EDIT_LABEL_CODE', editLabelCode);
    yield takeLatest('DISABLE_LABEL_CODE', disableLabelCode);
}

export default getLabelCodeSaga;

