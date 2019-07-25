import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getHarvestYearSaga(action){
    try{
        let result = yield axios.get(`/record/harvestYear`);
        yield put({type: 'SET_HARVEST_YEAR', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get harvest years! Try again later.`)
    }
}


function* recordHarvestYearSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_HARVEST_YEAR', getHarvestYearSaga);
}

export default recordHarvestYearSaga;
