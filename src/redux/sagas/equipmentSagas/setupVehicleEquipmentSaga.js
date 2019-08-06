import axios from 'axios';
import {
  put,
  takeLatest
} from 'redux-saga/effects';

function* getEquipment(action) {
  try {
    let result = yield axios.get('/setup/equipment/vehicle');
    yield put({
      type: 'SET_VEHICLE',
      payload: result.data
    });
  } catch (error) {
    console.log(`Couldn't get vehicle equipment list `, error);
    alert(`Sorry! Can't update the equipment list right now. Please try again later.`);

  }
}

function* addEquipment(action) {
  try {
    yield axios.post('/setup/equipment/vehicle/new', action.payload);
    yield put({
      type: 'GET_VEHICLE'
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
    yield axios.delete(`/setup/equipment/vehicle/delete/${id}`);
    yield put({
      type: 'GET_VEHICLE'
    });


  } catch (error) {
    console.log(`Error deleting equipment `, error);
    alert(`Sorry! Wasn't able to delete that equipment. Please try again.`);

  }
}

function* setupEquipmentSaga() {
  yield takeLatest('GET_VEHICLE', getEquipment)
  yield takeLatest('ADD_VEHICLE', addEquipment);
  yield takeLatest('DELETE_VEHICLE', deleteEquipment);
}

export default setupEquipmentSaga;