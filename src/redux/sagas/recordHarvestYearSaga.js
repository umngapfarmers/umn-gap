import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getHarvestYearSaga(action){
    console.log('in getHarvestYearSaga', action.payload)
    try{
        let result = yield axios.get(`/record/harvestYear`);
        yield put({type: 'SET_HARVEST_YEAR', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET HARVEST YEAR', error);
        alert(`Sorry! Was unable to get harvest years! Try again later.`)
    }
}


function* recordHarvestYearSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_HARVEST_YEAR', getHarvestYearSaga);
}

export default recordHarvestYearSaga;
