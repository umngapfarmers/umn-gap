import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getEquipmentOtherSaga(action){
    try{
        console.log('action.payload', action.payload);
        let result = yield axios.get(`/record/equipmentother/?harvest_year_id=${action.payload}`);
        yield put({type: 'SET_RECORD_EQUIPMENT_OTHER', payload: result.data})

    }
    catch (error){
        alert(`Sorry! Was unable to get equipment other record! Try again later.`)
    }
}


function* recordEquipmentOtherSaga() {
  yield takeLatest('GET_RECORD_EQUIPMENT_OTHER', getEquipmentOtherSaga);
}

export default recordEquipmentOtherSaga;
