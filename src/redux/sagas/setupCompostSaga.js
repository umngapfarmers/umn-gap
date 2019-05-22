import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addCompostSource(action){
    // console.log('in addManureSource', action.payload)
    try{
        yield axios.post('/setup/compost', action.payload);
        // let result = yield axios.get(`/setup/manure`);
        // console.log(`result get after add manure`, result.data);
        // yield put({type: 'SET_MANURE_SETUP', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* getCompostSource(action){
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

function* deleteCompostSource(action) {
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




function* setupManureSaga() {
  yield takeLatest('ADD_COMPOST_SOURCE', addCompostSource);
  yield takeLatest('GET_COMPOST_SOURCE', getCompostSource);
  yield takeLatest('DELETE_COMPOST_SOURCE', deleteCompostSource);
}

export default setupManureSaga;
