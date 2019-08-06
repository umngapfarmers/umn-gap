import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addBathroomSource(action) {
    try {
        yield axios.post('/setup/bathroom', action.payload);
        let result = yield axios.get(`/setup/bathroom`);
        yield put({ type: 'SET_BATHROOM_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's Bathroom! Try again later.`)
    }
}

function* addBathroomEdit(action) {
    try {
        yield axios.post('/setup/Bathroom/edit', action.payload);
        let result = yield axios.get(`/setup/bathroom`);
        yield put({ type: 'SET_BATHROOM_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's Bathroom! Try again later.`)
    }
}

function* getBathroomSource(action) {
    try {
        let result = yield axios.get(`/setup/bathroom`);
        yield put({ type: 'SET_BATHROOM_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's Bathroom! Try again later.`)
    }
}

function* deleteBathroomSource(action) {
    try {
        yield axios.delete(`/setup/bathroom/${action.payload}`);
        let result = yield axios.get(`/setup/bathroom`);
        yield put({ type: 'SET_BATHROOM_SETUP', payload: result.data })

    } catch (error) {
        alert(`Sorry! Was unable to setup the farm's Bathroom! Try again later.`)
    }
}

function* disableBathroomSource(action) {

    try {
        yield axios.put(`/setup/bathroom/disable`, action.payload);

        yield put({ type: 'GET_BATHROOM_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your Bathroom source. Try again later`);
    }
}

function* editBathroomSource(action) {

    try {
        yield axios.put(`/setup/bathroom/edit`, action.payload);

        yield put({ type: 'GET_BATHROOM_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your Bathroom source. Try again later`);
    }
}

function* setupBathroomSaga() {
    yield takeLatest('ADD_BATHROOM_SOURCE', addBathroomSource);
    yield takeLatest('ADD_BATHROOM_EDIT', addBathroomEdit);
    yield takeLatest('GET_BATHROOM_SOURCE', getBathroomSource);
    yield takeLatest('DELETE_BATHROOM_SOURCE', deleteBathroomSource);
    yield takeLatest('DISABLE_BATHROOM_SOURCE', disableBathroomSource);
    yield takeLatest('EDIT_BATHROOM_SOURCE', editBathroomSource);
}

export default setupBathroomSaga;