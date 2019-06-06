import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addHarvestYearSaga(action){
    try{
        yield axios.post('/setup/addHarvestYear', action.payload)
    }
    catch (error){
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* setupSaga() {
  yield takeLatest ('ADD_HARVEST_YEAR', addHarvestYearSaga);
}

export default setupSaga;
