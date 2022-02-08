import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import css page
import './AppointmentDetails.css';

function AppointmentDetails() {
  // params so we can access appointment by id on this page
  const params = useParams();
  const dispatch = useDispatch();

  // on page load
  useEffect(() => {
    // send dispatch to saga function to get appt details
    console.log('params', params.id);
    dispatch({
      type: 'FETCH_APPOINTMENT_DETAILS',
      payload: params.id
    });
  }, []);

  return (
    <p>Appointment Details Page</p>
  );
};

export default AppointmentDetails;
