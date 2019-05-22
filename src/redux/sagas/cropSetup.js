import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addCropSource(action) {
    console.log('Hit the addCropSaga', action.payload);

    try {
        yield axios.post(`/setupCrop/crop`, action.payload);
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
        yield axios.post(`/setupCrop/field`, action.payload);
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
        const response = yield axios.get(`/setupCrop/crop`);
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
        const response = yield axios.get(`/setupCrop/field`);
        yield put({ type: 'SET_FIELD_SOURCE', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get the field source`, error);
        alert(`Sorry, couldn't get the field source. Try again later`);
    }
}

function* deleteCropSource(action) {
    console.log('Hit the deleteCropSource', action);

    try {
        yield axios.delete(`/setupCrop/crop/${action.payload}`);
        console.log('saga id is', action.payload);
        
        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't delete crop`, error);
        alert(`Sorry, couldn't delete your crop. Try again later`);
    }
}

function* deleteFieldSource(action) {
    console.log('Hit the deleteFieldSource', action);

    try {
        yield axios.delete(`/setupCrop/field/${action.payload}`);
        yield put({ type: 'GET_FIELD_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't delete field`, error);
        alert(`Sorry, couldn't delete your field. Try again later`);
    }
}

function* cropSourceSaga() {
    yield takeLatest('ADD_CROP_SOURCE', addCropSource);
    yield takeLatest('GET_CROP_SOURCE', getCropSource);
    yield takeLatest('ADD_FIELD_SOURCE', addFieldSource);
    yield takeLatest('GET_FIELD_SOURCE', getFieldSource);
    yield takeLatest('DELETE_CROP_SOURCE', deleteCropSource);
    yield takeLatest('DELETE_FIELD_SOURCE', deleteFieldSource);
}


export default cropSourceSaga;