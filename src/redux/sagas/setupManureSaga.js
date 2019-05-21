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

function* getManureSource(action){
    // console.log('in addManureSource', action.payload)
    try{
        let result = yield axios.get(`/setup/manure/${action.payload.harvest_year_id}`);


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


    } catch (error) {
        console.log('ERROR IN deleteManureSource DELETE', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}




function* setupManureSaga() {
  yield takeLatest('ADD_MANURE_SOURCE', addManureSource);
  yield takeLatest('GET_MANURE_SOURCE', getManureSource);
  yield takeLatest('DELETE_MANURE_SOURCE', deleteManureSource);
}

export default setupManureSaga;
