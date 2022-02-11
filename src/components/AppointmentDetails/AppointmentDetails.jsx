import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// MUI imports
import { Button, Grid } from '@mui/material';
// import css page
import './AppointmentDetails.css';


function AppointmentDetails() {
  // params so we can access appointment by id on this page
  const params = useParams();
  const dispatch = useDispatch();
  // Define history in order to route to page
  const history = useHistory();
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

  // handle click of back button
  const handleBackClick = () => {
    // send user back to calendar
    history.push('/calendar');
    // clear reducer
    dispatch({
      type: 'CLEAR_APPOINTMENT_DETAILS'
    });
  };

  return (
    <div>
      <div className="card">

        <header>Appointment Details</header>
        <hr></hr>
        <img src="doctor_photo.jpg" alt="Provider Image"></img>

        <p id='provider'>Dr. {appointmentDetails.first_name} {appointmentDetails.last_name}</p>
        <p id='specialty'>{appointmentDetails.specialty}</p>
        <p className='gray-title'>Date</p>
        <p className='gray-title'>Time</p>
        <p className='appt-info'>{appointmentDetails.start_time} to {appointmentDetails.end_time}</p>
        <p className='gray-title'>Location</p>
        <p className='appt-info'>{appointmentDetails.address}</p>
        <p className='gray-title'>Description</p>
        <p className='appt-info'>{appointmentDetails.description}</p>

      </div>

      {/* back button */}
      <div>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            variant="contained"
            onClick={handleBackClick}
            size="large"
          >
            Back To Calendar
          </Button>
        </Grid>
      </div>

      <Navigation />

    </div>

  );
};

export default AppointmentDetails;
