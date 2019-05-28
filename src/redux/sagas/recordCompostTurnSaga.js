import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getRecordCompostTurnSaga(action){
    console.log('in getRecordCompostTurnSaga')
    console.log('Harvest Year Is:', action.payload);
    try{
        let result = yield axios.get(`/record/compostturn/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_COMPOST_TURN', payload: result.data})

    }
    catch (error){
        console.log('ERROR IN GET RECORD COMPOST TURN ', error);
        alert(`Sorry! Was unable to get compost turning record! Try again later.`)
    }
}


function* recordCompostTurnSaga() {
//   yield takeLatest('ADD_FARM', addFarmSaga);
  yield takeLatest('GET_RECORD_COMPOST_TURN', getRecordCompostTurnSaga);
}

export default recordCompostTurnSaga;
