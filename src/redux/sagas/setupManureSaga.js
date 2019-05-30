import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addManureSource(action){
    // console.log('in addManureSource', action.payload)
    try{
        yield axios.post('/setup/manure', action.payload);
        let result = yield axios.get(`/setup/manure`);
        console.log(`result get after add manure`, result.data);
        yield put({type: 'SET_MANURE_SETUP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* addManureEdit(action) {
    // console.log('in addManureSource', action.payload)
    try {
        yield axios.post('/setup/manure/new', action.payload);
        let result = yield axios.get(`/setup/manure`);
        console.log(`result get after add manure`, result.data);
        yield put({ type: 'SET_MANURE_SETUP', payload: result.data })

    }
    catch (error) {
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* getManureSource(action){
    // console.log('in addManureSource', action.payload)
    try{
        let result = yield axios.get(`/setup/manure`);
        yield put({type: 'SET_MANURE_SETUP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN getManureSource GET', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* deleteManureSource(action) {
    console.log('in deleteManureSource', action.payload)
    try {
        yield axios.delete(`/setup/manure/${action.payload.id}`);
        let result = yield axios.get(`/setup/manure`);
        yield put({type: 'SET_MANURE_SETUP', payload: result.data})

    } catch (error) {
        console.log('ERROR IN deleteManureSource DELETE', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* disableManureSource(action) {
    console.log('Hit the disableManureSource', action);

    try {
        yield axios.put(`/setup/manure/disable`, action.payload);
        console.log('saga id is', action.payload);

        yield put({ type: 'GET_MANURE_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't disable manure source`, error);
        alert(`Sorry, couldn't disable your manure source. Try again later`);
    }
}

function* editManureSource(action) {
    console.log('Hit the editManureSource', action);

    try {
        yield axios.put(`/setup/manure/edit`, action.payload);
        console.log('saga id is', action.payload);

        yield put({ type: 'GET_MANURE_SOURCE' });
    }
    catch (error) {
        console.log(`Couldn't change manure source`, error);
        alert(`Sorry, couldn't change your manure source. Try again later`);
    }
}




function* setupManureSaga() {
  yield takeLatest('ADD_MANURE_SOURCE', addManureSource);
    yield takeLatest('ADD_MANURE_EDIT', addManureEdit);
  yield takeLatest('GET_MANURE_SOURCE', getManureSource);
  yield takeLatest('DELETE_MANURE_SOURCE', deleteManureSource);
  yield takeLatest('EDIT_MANURE_SOURCE', editManureSource);
  yield takeLatest('DISABLE_MANURE_SOURCE', disableManureSource);
}

export default setupManureSaga;
