import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addCoolerSource(action) {
    try {
        yield axios.post('/setup/cooler', action.payload);
        let result = yield axios.get(`/setup/cooler`);
        yield put({ type: 'SET_COOLER_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's Cooler! Try again later.`)
    }
}

function* addCoolerEdit(action) {
    try {
        yield axios.post('/setup/cooler/edit', action.payload);
        let result = yield axios.get(`/setup/cooler`);
        yield put({ type: 'SET_COOLER_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's cooler! Try again later.`)
    }
}

function* getCoolerSource(action) {
    try {
        let result = yield axios.get(`/setup/cooler`);
        yield put({ type: 'SET_COOLER_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's Cooler! Try again later.`)
    }
}

function* deleteCoolerSource(action) {
    try {
        yield axios.delete(`/setup/cooler/${action.payload.id}`);
        let result = yield axios.get(`/setup/cooler`);
        yield put({ type: 'SET_COOLER_SETUP', payload: result.data })

    } catch (error) {
        alert(`Sorry! Was unable to setup the farm's Cooler! Try again later.`)
    }
}

function* disableCoolerSource(action) {

    try {
        yield axios.put(`/setup/cooler/disable`, action.payload);

        yield put({ type: 'GET_COOLER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your Cooler source. Try again later`);
    }
}

function* editCoolerSource(action) {

    try {
        yield axios.put(`/setup/cooler/edit`, action.payload);

        yield put({ type: 'GET_COOLER_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your Cooler source. Try again later`);
    }
}

function* setupCoolerSaga() {
    yield takeLatest('ADD_COOLER_SOURCE', addCoolerSource);
    yield takeLatest('ADD_COOLER_EDIT', addCoolerEdit);
    yield takeLatest('GET_COOLER_SOURCE', getCoolerSource);
    yield takeLatest('DELETE_COOLER_SOURCE', deleteCoolerSource);
    yield takeLatest('DISABLE_COOLER_SOURCE', disableCoolerSource);
    yield takeLatest('EDIT_COOLER_SOURCE', editCoolerSource);
}

export default setupCoolerSaga;