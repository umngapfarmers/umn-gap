import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWaterSource(action) {
    console.log('Hit the addWaterSaga', action);

    try {
        yield axios.post(`/api/setupWater`, action.payload);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the water source`, error);
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}

function* getWaterSource(action) {
    console.log('in getWaterSource', action);

    try {
        yield axios.get(`/api/setupWater`);
        yield put({type: 'SET_WATER_SOURCE'})
    }
    catch (error) {
        console.log(`Couldn't get the water source`, error);
        alert(`Sorry, couldn't get the water source. Try again later`);
    }
}


function* waterSourceSaga() {
    yield takeLatest('ADD_WATER_SOURCE', addWaterSource);
    yield takeLatest('GET_WATER_SOURCE', getWaterSource)
}


export default waterSourceSaga;