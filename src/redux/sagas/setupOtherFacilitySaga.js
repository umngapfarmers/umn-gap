import axios from 'axios';
import {
  put,
  takeLatest
} from 'redux-saga/effects';


function* getOtherFacility(action) {
  try {
    let result = yield axios.get('/setup/otherfacility');
    yield put({
      type: 'SET_OTHER_SETUP',
      payload: result.data
    });
  } catch (error) {
    console.log(`Couldn't get other facility list `, error);
    alert(`Sorry! Can't update the facility list right now. Please try again later.`);

  }
}

function* addOtherFacility(action) {
  try {
    yield axios.post('/setup/otherfacility/new', action.payload);
    yield put({
      type: 'GET_OTHER_FACILITY'
    });
  } catch (error) {
    console.log(`Error adding facility `, error);
    alert(`Sorry! Was unable to add a other facility. Try again later.`)
  }
}

function* deleteOtherFacility(action) {
  try {
    console.log(`in delete other facility`);
    let id = action.payload.id;
    yield axios.delete(`/setup/otherfacility/${id}`);
    yield put({
      type: 'GET_OTHER_FACILITY'
    });


  } catch (error) {
    console.log(`Error deleting facility `, error);
    alert(`Sorry! Wasn't able to delete that facility. Please try again.`);

  }
}

function* setupFacilitySaga() {
  yield takeLatest('GET_OTHER_FACILITY', getOtherFacility)
  yield takeLatest('ADD_OTHER_FACILITY', addOtherFacility);
  yield takeLatest('DELETE_OTHER_FACILITY', deleteOtherFacility);

}

export default setupFacilitySaga;