import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Saga function to GET all users appointments from DB
function* fetchUserAppointments() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/appointments'
    })
    // console.log('in fetchUserAppointments GET, response:', response.data);
    // populate appointments reducer w/ response from DB
    yield put({
      type: 'LOAD_APPOINTMENTS',
      payload: response.data
    });

  } catch (err) {
    console.error('fetchUserAppointments error', err);
  }
};

// Saga function to GET appointment details for one appointment
function* fetchAppointmentDetails(action) {
  try {
    const response = yield axios({
      method: 'GET',
      url: `/api/appointments/${action.payload}`
    })
    console.log('in fetchAppointmentDetails GET, response:', response.data);
  } catch (err) {
    console.error('fetchUserAppointments error', err);
  }
};

// Saga function to intercept dispatches
function* appointmentsSaga() {
  yield takeEvery('FETCH_USER_APPOINTMENTS', fetchUserAppointments);
  yield takeEvery('FETCH_APPOINTMENT_DETAILS', fetchAppointmentDetails);
};

export default appointmentsSaga;