import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addCropSource(action) {
    console.log('Hit the addCropSaga', action.payload);

    try {
        yield axios.post(`/api/setupCrop/crop`, action.payload);
        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the Crop source`, action.payload, error);
        alert(`Sorry, couldn't add the Crop source. Try again later`);
    }
}

function* addFieldSource(action) {
    console.log('Hit the addFieldSaga', action.payload);

    try {
        yield axios.post(`/api/setupCrop/field`, action.payload);
        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the field source`, action.payload, error);
        alert(`Sorry, couldn't add the fieldsource. Try again later`);
    }
}

function* getCropSource(action) {
    console.log('in getCropSource', action);

    try {
        const response = yield axios.get(`/api/setupCrop/crop`);
        yield put({ type: 'SET_CROP_SOURCE', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get the Crop source`, error);
        alert(`Sorry, couldn't get the Crop source. Try again later`);
    }
}

function* getFieldSource(action) {
    console.log('in getFieldSource', action);

    try {
        const response = yield axios.get(`/api/setupCrop/field`);
        yield put({ type: 'SET_FIELD_SOURCE', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get the field source`, error);
        alert(`Sorry, couldn't get the field source. Try again later`);
    }
}


function* cropSourceSaga() {
    yield takeLatest('ADD_CROP_SOURCE', addCropSource);
    yield takeLatest('GET_CROP_SOURCE', getCropSource);
    yield takeLatest('ADD_FIELD_SOURCE', addFieldSource);
    yield takeLatest('GET_FIELD_SOURCE', getFieldSource);
}


export default cropSourceSaga;