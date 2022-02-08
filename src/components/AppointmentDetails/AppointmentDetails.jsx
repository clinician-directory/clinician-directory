import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// import css page
import './AppointmentDetails.css';

function AppointmentDetails() {
  // params so we can access appointment by id on this page
  const params = useParams();
  const dispatch = useDispatch();
  // access appt details reducer
  const appointmentDetails = useSelector(store => store.appointmentDetailsReducer);
  console.log('appointmentDetails', appointmentDetails);
  // on page load
  useEffect(() => {
    // send dispatch to saga function to get appt details
    dispatch({
      type: 'FETCH_APPOINTMENT_DETAILS',
      payload: params.id
    });
  }, []);

  return (
    <div>
      <h1>Appointment Details</h1>

      <p>Provider: {appointmentDetails.first_name} {appointmentDetails.last_name}</p>
      <p>Location: {appointmentDetails.address}</p>
      <p>Start: {appointmentDetails.start_time}</p>
      <p>End: {appointmentDetails.end_time}</p>
      <p>Description: {appointmentDetails.description}</p>

      <Navigation />

    </div>
  );
};

export default AppointmentDetails;
