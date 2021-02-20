import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import showNotification from '../../showNotification';

function* client(formValues) {
  yield put({ type: "CLIENT_INFO_SUCCESS", client_info: formValues.payload, });
}

function* mainInfo(formValues) {
  debugger;
  const { plate } = formValues.payload;
  const error = [];
  const data = [];
  yield axios.get(`https://lafersegurosapi.azurewebsites.net/api/Soat/${plate}`, {
    "accept": "*/*",
    "Access-Control-Allow-Origin": "*",
  }).then((response) => {
    data.push(response);
  }).catch(e => {
    error.push(e);
  });

  if (error.length === 0) {
debugger;
    const formatted = JSON.parse(data[0].data.replace(/'/gm,"\""));
    message.success('!Datos correctos!');
    //yield call(showNotification, { type: 'success', message: 'Datos correctos' });
    yield put({ type: "MAIN_INFO_SUCCESS", response: formatted });
  } else {
    message.info('!Por favor completa los datos!');
    yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor intentalo nuevamente' });
    yield put({ type: "MAIN_INFO_FAILURE", response: {}, });
  }
}

export function* clientWatcher() {
  yield takeLatest('CLIENT_INFO', client);
  yield takeLatest('MAIN_INFO', mainInfo);
}
