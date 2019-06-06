import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function* getDocDef(action) {
    try {

        let result = yield axios.post(`/record/export/`, action.payload);

        pdfMake.createPdf(result.data).download();

    } catch (error) {
        alert(`Sorry! Was unable to export records! Try again later.`)
    }
}


function* getDocDefSaga() {
    yield takeLatest('GET_EXPORT_PDF', getDocDef);

}

export default getDocDefSaga;
