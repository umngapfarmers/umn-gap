import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWaterSource(action) {

    try {
        yield axios.post(`/setupWater/source`, action.payload);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}

function* addWaterLabel(action) {

    try {
        yield axios.post(`/setupWater/label`, action.payload);
        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}

function* getWaterSource(action) {

    try {
        const response = yield axios.get(`/setupWater/source`);
        yield put({ type: 'SET_WATER_SOURCE', payload: response.data })
    }
    catch (error) {
        alert(`Sorry, couldn't get the water source. Try again later`);
    }
}

function* getWaterLabel(action) {

    try {
        const response = yield axios.get(`/setupWater/label`);
        yield put({ type: 'SET_WATER_LABEL', payload: response.data })
        
    }
    catch (error) {
        alert(`Sorry, couldn't get the water label. Try again later`);
    }
}

function* deleteWaterSource(action) {

    try {
        yield axios.delete(`/setupWater/source/${action.payload}`);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't delete your Water source. Try again later`);
    }
}

function* deleteWaterLabel(action) {

    try {
        yield axios.delete(`/setupWater/label/${action.payload}`);
        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        alert(`Sorry, couldn't delete your Water label. Try again later`);
    }
}

function* disableWaterSource(action) {

    try {
        yield axios.put(`/setupWater/disableSource`, action.payload);

        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your water source. Try again later`);
    }
}

function* disableWaterLabel(action) {

    try {
        yield axios.put(`/setupWater/disableLabel`, action.payload);

        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your water label. Try again later`);
    }
}

function* editWaterSource(action) {

    try {
        yield axios.put(`/setupWater/editSource`, action.payload);

        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your water source. Try again later`);
    }
}

function* editWaterLabel(action) {

    try {
        yield axios.put(`/setupWater/editLabel`, action.payload);

        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your water label. Try again later`);
    }
}


function* waterSourceSaga() {
    yield takeLatest('ADD_WATER_SOURCE', addWaterSource);
    yield takeLatest('ADD_WATER_LABEL', addWaterLabel);
    yield takeLatest('GET_WATER_SOURCE', getWaterSource);
    yield takeLatest('GET_WATER_LABEL', getWaterLabel);
    yield takeLatest('DELETE_WATER_SOURCE', deleteWaterSource);
    yield takeLatest('DELETE_WATER_LABEL', deleteWaterLabel);
    yield takeLatest('DISABLE_WATER_SOURCE', disableWaterSource);
    yield takeLatest('DISABLE_WATER_LABEL', disableWaterLabel);
    yield takeLatest('EDIT_WATER_SOURCE', editWaterSource);
    yield takeLatest('EDIT_WATER_LABEL', editWaterLabel);
}


export default waterSourceSaga;