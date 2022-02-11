import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Saga function to GET all users appointments from DB
function* fetchUserAppointments() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/appointments'
    })
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
    });
    // send DB response to appt details reducer
    yield put({
      type: 'LOAD_APPOINTMENT_DETAILS',
      payload: response.data[0]
    });
  } catch (err) {
    console.error('fetchAppointmentDetails error', err);
  }
};

// Saga function to DELETE appointment
function* deleteAppointment(action) {
  try {
    const response = yield axios({
      method: 'DELETE',
      url: `/api/appointments/${action.payload}`
    });
    console.log('response.data', response.data);
    // // send DB response to appt details reducer
    // yield put({
    //   type: 'LOAD_APPOINTMENT_DETAILS',
    //   payload: response.data[0]
    // });
  } catch (err) {
    console.error('fetchAppointmentDetails error', err);
  }
};


// Saga function to intercept dispatches
function* appointmentsSaga() {
  yield takeEvery('FETCH_USER_APPOINTMENTS', fetchUserAppointments);
  yield takeEvery('FETCH_APPOINTMENT_DETAILS', fetchAppointmentDetails);
  yield takeEvery('DELETE_APPOINTMENT', deleteAppointment);
};

export default appointmentsSaga;