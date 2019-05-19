import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addFarmSaga(action) {
    console.log('in setupFarm', action.payload)
    try{
        yield axios.post('/addFarm', action.payload)
    }
    catch (error){
        console.log('ERROR IN SETUPFARM POST', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* setupFarmSaga() {
  yield takeLatest('ADD_FARM', addFarmSaga);
}

export default setupFarmSaga;
