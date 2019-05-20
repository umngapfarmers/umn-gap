import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addCropSource(action) {
    console.log('Hit the addCropSaga', action);

    try {
        yield axios.put(`/api/setupCrop`);
        yield put({ type: 'GET_CROP_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't add the Crop source`, error);
        alert(`Sorry, couldn't add the Crop source. Try again later`);
    }
}

function* getCropSource(action) {
    console.log('in getCropSource', action);

    try {
        yield axios.put(`/api/setupCrop`);
        yield put({ type: 'SET_CROP_SOURCE' })
    }
    catch (error) {
        console.log(`Couldn't get the Crop source`, error);
        alert(`Sorry, couldn't get the Crop source. Try again later`);
    }
}


function* cropSourceSaga() {
    yield takeLatest('ADD_CROP_SOURCE', addCropSource);
    yield takeLatest('GET_CROP_SOURCE', getCropSource)
}


export default cropSourceSaga;