import axios from 'axios';
import {
  put,
  takeLatest
} from 'redux-saga/effects';

function* getEquipment(action) {
  try {
    let result = yield axios.get('/setup/equipment/thermometer');
    yield put({
      type: 'SET_THERMOMETER',
      payload: result.data
    });
  } catch (error) {
    console.log(`Couldn't get thermometer equipment list `, error);
    alert(`Sorry! Can't update the equipment list right now. Please try again later.`);

  }
}

function* addEquipment(action) {
  try {
    yield axios.post('/setup/equipment/thermometer/new', action.payload);
    yield put({
      type: 'GET_THERMOMETER'
    });
  } catch (error) {
    console.log(`Error adding equipment `, error);
    alert(`Sorry! Was unable to add an equipment. Try again later.`)
  }
}

function* deleteEquipment(action) {
  try {
    console.log(`in delete other equipment`);
    let id = action.payload.id;
    yield axios.delete(`/setup/equipment/thermometer/delete/${id}`);
    yield put({
      type: 'GET_THERMOMETER'
    });


  } catch (error) {
    console.log(`Error deleting equipment `, error);
    alert(`Sorry! Wasn't able to delete that equipment. Please try again.`);

  }
}

function* setupEquipmentSaga() {
  yield takeLatest('GET_THERMOMETER', getEquipment)
  yield takeLatest('ADD_THERMOMETER', addEquipment);
  yield takeLatest('DELETE_THERMOMETER', deleteEquipment);
}

export default setupEquipmentSaga;