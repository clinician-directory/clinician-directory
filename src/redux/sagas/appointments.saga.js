import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Saga function to GET all appointments from DB
function* fetchAllAppointments() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/appointments'
    })
    console.log('in fetchAllAppointments GET, response:', response.data);
  // populate appointments reducer w/ results from DB

  } catch(err) {
    console.error('fetchAllAppointments error', err);
  }
};


// Saga function to intercept dispatches
function* appointmentsSaga() {
  yield takeEvery('FETCH_ALL_APPOINTMENTS', fetchAllAppointments);
};

export default appointmentsSaga;