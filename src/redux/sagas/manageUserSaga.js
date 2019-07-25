import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getPersonSaga(action) {
    try {
        let result = yield axios.get(`/manage/person`)

        yield put({ type: "SET_EDIT_PERSON", payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* editemployeeSaga(action) {
    try {
        let result = yield axios.put(`/manage/person/edit`, action.payload)

        yield put({ type: "SET_EDIT_PERSON", payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}


function* getUserSaga(action) {
    try {
        let result = yield axios.get(`/manage/user`)

        yield put({ type: "SET_EDIT_USER", payload: result.data })

    }
    catch (error) {
        alert(`Sorry! Was unable to setup the farm! Try again later.`)
    }
}

function* editPersonSaga(action) {
    try {
        const selectedPerson=yield axios.get(`/manage/person/edit/?person_id=${action.payload}`);
        yield put({ type: "SET_EDIT_PERSON", payload: selectedPerson.data });

    } catch (err) {
        alert(`Sorry! Was unable to edit person`)
    }
}
function* editPickUserSaga(action) {
    try {
        const selectedUser=yield axios.get(`/manage/user/edit/?user_id=${action.payload}`);
        yield put({ type: "SET_EDIT_USER", payload: selectedUser.data });
    } catch (err) {
        alert(`Sorry! Was unable to edit person`)

    }
}

function* editUserPasswordlessSaga(action) {
    try{
      yield axios.put(`/manage/user/passwordless`, action.payload)

    }
    catch (error) {
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}

function* editUserPasswordSaga(action) {
    try{
      yield axios.put(`/manage/user/password`, action.payload)

    }
    catch (error) {
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}


function* editPersonNewUserSaga(action) {
    try{
      yield axios.put(`/manage/person/editNewUser`, action.payload)

    }
    catch (error) {
        alert(`Sorry! Was unable to edit user! Try again later.`)
    }
}


function* getEmployeeSaga(action) {
    try {
        let result = yield axios.get(`/manage/employee`)
        yield put({ type: "SET_PERSON", payload: result.data })    
    }
    catch (error) {
        alert(`Sorry! Was unable to get employees! Try again later.`)
    }
}



function* manageUSerSaga() {
    yield takeLatest('GET_PERSON', getPersonSaga);
    yield takeLatest('EDIT_PERSON', editemployeeSaga);
    yield takeLatest('GET_USER', getUserSaga);
    yield takeLatest('GET_PERSON_TO_EDIT', editPersonSaga);
    yield takeLatest('GET_USER_TO_EDIT', editPickUserSaga);
    yield takeLatest('EDIT_USER_PASSWORDLESS', editUserPasswordlessSaga);
    yield takeLatest('EDIT_USER_PASSWORD', editUserPasswordSaga);
    yield takeLatest('EDIT_PERSON_NEW_USER', editPersonNewUserSaga);
    yield takeLatest('GET_EMPLOYEE', getEmployeeSaga)

}

export default manageUSerSaga;