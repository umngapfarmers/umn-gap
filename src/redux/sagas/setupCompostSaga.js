import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addCompostSource(action){
    console.log('in addCompostSource', action.payload)
    try{
        yield axios.post('/setup/compost', action.payload);
        let result = yield axios.get(`/setup/compost`);
        console.log(`result get after add manure`, result.data);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* getCompostSource(action){
    // console.log('in getCompostSource', action.payload)
    try{
        let result = yield axios.get(`/setup/compost`);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN getCompostSource GET', error);
        alert(`Sorry! Was unable to setup the farm's compost! Try again later.`)
    }
}

function* deleteCompostSource(action) {
    console.log('in deleteCompostSource', action.payload)
    try {
        yield axios.delete(`/setup/compost/${action.payload.id}`);
        let result = yield axios.get(`/setup/compost`);
        yield put({type: 'SET_COMPOST_SETUP', payload: result.data})

    } catch (error) {
        console.log('ERROR IN deleteCompostSource DELETE', error);
        alert(`Sorry! Was unable to setup the farm's compost! Try again later.`)
    }
}

function* disableCompostSource(action) {
    console.log('Hit the disableCompostSource', action);

    try {
        yield axios.put(`/setup/compost/disable`, action.payload);
        console.log('saga id is', action.payload);

        yield put({ type: 'GET_COMPOST_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't disable compost source`, error);
        alert(`Sorry, couldn't disable your compost source. Try again later`);
    }
}

function* editCompostSource(action) {
    console.log('Hit the editCompostSource', action);

    try {
        yield axios.put(`/setup/compost/edit`, action.payload);
        console.log('saga id is', action.payload);

        yield put({ type: 'GET_COMPOST_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't change compost source`, error);
        alert(`Sorry, couldn't change your compost source. Try again later`);
    }
}

function* setupManureSaga() {
  yield takeLatest('ADD_COMPOST_SOURCE', addCompostSource);
  yield takeLatest('GET_COMPOST_SOURCE', getCompostSource);
  yield takeLatest('DELETE_COMPOST_SOURCE', deleteCompostSource);
  yield takeLatest('DISABLE_COMPOST_SOURCE', disableCompostSource);
  yield takeLatest('EDIT_COMPOST_SOURCE', editCompostSource);
}

export default setupManureSaga;
