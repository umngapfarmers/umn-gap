import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addCompostSource(action){
    try{
        yield axios.post('/setup/compost', action.payload);
        let result = yield axios.get(`/setup/compost`);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* addCompostEdit(action) {
    try {
        yield axios.post('/setup/compost/edit', action.payload);
        let result = yield axios.get(`/setup/compost`);
        yield put({ type: 'SET_COMPOST_SETUP', payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* getCompostSource(action){
    try{
        let result = yield axios.get(`/setup/compost`);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to setup the farm's compost! Try again later.`)
    }
}

function* deleteCompostSource(action) {
    try {
        yield axios.delete(`/setup/compost/${action.payload.id}`);
        let result = yield axios.get(`/setup/compost`);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    } catch (error) {
        alert(`Sorry! Was unable to setup the farm's compost! Try again later.`)
    }
}

function* disableCompostSource(action) {

    try {
        yield axios.put(`/setup/compost/disable`, action.payload);

        yield put({ type: 'GET_COMPOST_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't disable your compost source. Try again later`);
    }
}

function* editCompostSource(action) {

    try {
        yield axios.put(`/setup/compost/edit`, action.payload);

        yield put({ type: 'GET_COMPOST_SOURCE' });
    }
    catch (error) {
        alert(`Sorry, couldn't change your compost source. Try again later`);
    }
}

function* setupManureSaga() {
  yield takeLatest('ADD_COMPOST_SOURCE', addCompostSource);
    yield takeLatest('ADD_COMPOST_EDIT', addCompostEdit);
  yield takeLatest('GET_COMPOST_SOURCE', getCompostSource);
  yield takeLatest('DELETE_COMPOST_SOURCE', deleteCompostSource);
  yield takeLatest('DISABLE_COMPOST_SOURCE', disableCompostSource);
  yield takeLatest('EDIT_COMPOST_SOURCE', editCompostSource);
}

export default setupManureSaga;
