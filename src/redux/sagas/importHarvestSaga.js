import axios from 'axios';
import {takeLatest } from 'redux-saga/effects';

function* importHarvest(action) {
    try {
        yield axios.post('/import', action.payload)
    } catch (err) {
    }
}

function* importHarvestSaga() {
    yield takeLatest("IMPORT_HARVEST", importHarvest);
}

export default importHarvestSaga;