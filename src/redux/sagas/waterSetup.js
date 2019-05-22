import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWaterSource(action) {
    console.log('Hit the addWaterSaga', action);

    try {
        yield axios.post(`/setupWater/source`, action.payload);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the water source`, action.payload, error);
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}

function* addWaterLabel(action) {
    console.log('Hit the addWaterSaga', action);

    try {
        yield axios.post(`/setupWater/label`, action.payload);
        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        console.log(`Couldn't add the water source`, action.payload, error);
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}

function* getWaterSource(action) {
    console.log('in getWaterSource', action);

    try {
        const response = yield axios.get(`/setupWater/source`);
        yield put({ type: 'SET_WATER_SOURCE', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get the water source`, error);
        alert(`Sorry, couldn't get the water source. Try again later`);
    }
}

function* getWaterLabel(action) {
    console.log('in getWaterLabel', action);

    try {
        const response = yield axios.get(`/setupWater/label`);
        yield put({ type: 'SET_WATER_LABEL', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get the water label`, error);
        alert(`Sorry, couldn't get the water label. Try again later`);
    }
}

function* deleteWaterSource(action) {
    console.log('Hit the deleteWaterSource', action);

    try {
        yield axios.delete(`/setupWater/source/${action.payload}`);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't delete Water source`, error);
        alert(`Sorry, couldn't delete your Water source. Try again later`);
    }
}

function* deleteWaterLabel(action) {
    console.log('Hit the deleteWaterLabel', action);

    try {
        yield axios.delete(`/setupWater/label/${action.payload}`);
        yield put({ type: 'GET_WATER_LABEL' });
    }
    catch (error) {
        console.log(`Couldn't delete Water label`, error);
        alert(`Sorry, couldn't delete your Water label. Try again later`);
    }
}


function* waterSourceSaga() {
    yield takeLatest('ADD_WATER_SOURCE', addWaterSource);
    yield takeLatest('GET_WATER_SOURCE', getWaterSource);
    yield takeLatest('DELETE_WATER_SOURCE', deleteWaterSource);
    yield takeLatest('ADD_WATER_LABEL', addWaterLabel);
    yield takeLatest('GET_WATER_LABEL', getWaterLabel);
    yield takeLatest('DELETE_WATER_LABEL', deleteWaterLabel);
}


export default waterSourceSaga;