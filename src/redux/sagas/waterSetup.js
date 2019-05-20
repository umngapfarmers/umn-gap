import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addWaterSaga(action) {
    console.log('Hit the addWaterSaga', action);

    try {
        yield axios.put(`/api/setupWater`);
        yield put({ type: 'GET_WATER_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the water source`, error);
        alert(`Sorry, couldn't add the water source. Try again later`);
    }
}


function* waterSourceSaga() {
    yield takeLatest('ADD_WATER_SOURCE', addWaterSaga);
}


export default waterSourceSaga;