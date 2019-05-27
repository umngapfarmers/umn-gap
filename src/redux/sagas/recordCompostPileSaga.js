import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getRecordCompostPileSaga(action){
    console.log('in getRecordCompostPileSaga')
    try{
        let result = yield axios.get(`/record/compostpile/?harvest_year=${action.payload}`);
        yield put({type: 'SET_RECORD_COMPOST_PILE', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET RECORD COMPOST PILE ', error);
        alert(`Sorry! Was unable to get compost pile record! Try again later.`)
    }
}


function* recordCompostPileSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_RECORD_COMPOST_PILE', getRecordCompostPileSaga);
}

export default recordCompostPileSaga;
