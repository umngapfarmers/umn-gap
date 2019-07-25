import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addCropSource(action) {

    try {
        yield axios.post(`/setupCrop/crop`, action.payload);
        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't add the Crop source. Try again later`);
    }
}

function* addFieldSource(action) {

    try {
        yield axios.post(`/setupCrop/field`, action.payload);
        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't add the fieldsource. Try again later`);
    }
}

function* getCropSource(action) {

    try {
        const response = yield axios.get(`/setupCrop/crop`);
        yield put({ type: 'SET_CROP_SOURCE', payload: response.data })
    }
    catch (error) {
        alert(`Sorry, couldn't get the Crop source. Try again later`);
    }
}

function* getFieldSource(action) {

    try {
        const response = yield axios.get(`/setupCrop/field`);
        yield put({ type: 'SET_FIELD_SOURCE', payload: response.data })
    }
    catch (error) {
        alert(`Sorry, couldn't get the field source. Try again later`);
    }
}

function* deleteCropSource(action) {

    try {
        yield axios.delete(`/setupCrop/crop/${action.payload}`);
        
        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't delete your crop. Try again later`);
    }
}

function* deleteFieldSource(action) {

    try {
        yield axios.delete(`/setupCrop/field/${action.payload}`);
        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't delete your field. Try again later`);
    }
}

function* disableCropSource(action) {

    try {
        yield axios.put(`/setupCrop/disablecrop`, action.payload);

        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your crop. Try again later`);
    }
}

function* disableFieldSource(action) {

    try {
        yield axios.put(`/setupCrop/disablefield`, action.payload);

        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your field. Try again later`);
    }
}

function* editCropSource(action) {

    try {
        yield axios.put(`/setupCrop/editcrop`, action.payload);

        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your crop. Try again later`);
    }
}

function* editFieldSource(action) {

    try {
        yield axios.put(`/setupCrop/editfield`, action.payload);

        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your Field. Try again later`);
    }
}

function* cropSourceSaga() {
    yield takeLatest('ADD_CROP_SOURCE', addCropSource);
    yield takeLatest('ADD_FIELD_SOURCE', addFieldSource);
    yield takeLatest('GET_CROP_SOURCE', getCropSource);
    yield takeLatest('GET_FIELD_SOURCE', getFieldSource);
    yield takeLatest('DELETE_CROP_SOURCE', deleteCropSource);
    yield takeLatest('DELETE_FIELD_SOURCE', deleteFieldSource);
    yield takeLatest('DISABLE_FIELD_SOURCE', disableFieldSource);
    yield takeLatest('DISABLE_CROP_SOURCE', disableCropSource);
    yield takeLatest('EDIT_CROP_SOURCE', editCropSource);
    yield takeLatest('EDIT_FIELD_SOURCE', editFieldSource);
}


export default cropSourceSaga;