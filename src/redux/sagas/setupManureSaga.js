import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addManureSource(action){
    console.log('in addManureSource', action.payload)
    try{
        yield axios.post('/setup/manure', action.payload);
        
        put({type: 'GET_MANURE_SOURCE', payload: {harvest_year:1}})
    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}

function* getManureSource(action){
    console.log('in getManureSource', action.payload)
    try{
        yield axios.get(`/setup/manure/${action.payload.harvest_year}`)
    }
    catch (error){
        console.log('ERROR IN addManureSource POST', error);
        alert(`Sorry! Was unable to setup the farm's manure! Try again later.`)
    }
}


function* setupManureSaga() {
  yield takeLatest('ADD_MANURE_SOURCE', addManureSource);
  yield takeLatest('GET_MANURE_SOURCE', getManureSource)
}

export default setupManureSaga;
