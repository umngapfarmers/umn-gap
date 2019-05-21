import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addManureSource(action){
    console.log('in addManureSource', action.payload)
    try{
        yield axios.post('/setup/manure', action.payload)
    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* setupManureSaga() {
  yield takeLatest ('ADD_MANURE_SOURCE', addManureSource);
}

export default setupManureSaga;
