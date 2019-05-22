import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addHarvestYearSaga(action){
    console.log('in addHarvestYearSaga', action.payload)
    try{
        yield axios.post('/setup/addHarvestYear', action.payload)
    }
    catch (error){
        console.log('ERROR IN addHarvestYearSaga POST', error);
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* setupSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest ('ADD_HARVEST_YEAR', addHarvestYearSaga);
}

export default setupSaga;
