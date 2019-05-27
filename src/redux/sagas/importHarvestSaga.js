import axios from 'axios';
import {takeLatest } from 'redux-saga/effects';

function* importHarvest(action) {
    try {
        yield axios.post('/import', action.payload)
    } catch (err) {
        console.log(`couldn't import previous harvest Year`, err);
    }
}

function* importHarvestSaga() {
    yield takeLatest("IMPORT_HARVEST", importHarvest);
}

export default importHarvestSaga;