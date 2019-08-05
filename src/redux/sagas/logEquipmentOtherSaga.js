import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getEquipmentOtherSaga(action){
    try{
        let result = yield axios.get(`/log/equipmentother`);
        yield put({type: 'SET_EQUIPMENT_OTHER_LOG', payload: result.data})
    }
    catch (error){
        alert(`Sorry! Was unable to get equipment other information! Try again later.`)
    }
}

function* addEquipmentOtherSaga(action){
    try{
        let result = yield axios.post(`/log/equipmentother/add`, action.payload);
    }
    catch (error){
        alert(`Sorry! Was unable to submit equipment other maintenance log! Try again later.`)
    }
}




function* logEquipmentOtherSaga() {
  yield takeLatest('GET_EQUIPMENT_OTHER', getEquipmentOtherSaga);
  yield takeLatest('ADD_EQUIPMENT_OTHER_LOG', addEquipmentOtherSaga)
}

export default logEquipmentOtherSaga;
