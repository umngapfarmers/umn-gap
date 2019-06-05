import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function* getDocDef(action) {
    try {
        console.log(`dispatch payload`, action.payload)

        let result = yield axios.post(`/record/export/`, action.payload);
        console.log('result ', result.data)

        pdfMake.createPdf(result.data).download();

    } catch (error) {
        console.log('ERROR exporting records', error);
        alert(`Sorry! Was unable to export records! Try again later.`)
    }
}


function* getDocDefSaga() {
    yield takeLatest('GET_EXPORT_PDF', getDocDef);

}

export default getDocDefSaga;
