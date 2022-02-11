import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// MUI imports
import { Button, Grid } from '@mui/material';
// import to reformat date and time
import { DateTime } from "luxon";
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

  /* function to append available or not to DOM depending 
  on if provider has telemedicine option */
  function determineTelemedicineAvailability() {
    if (appointmentDetails.telemedicine) {
      return <p className='appt-info'>Available</p>
    } else {
      return <p className='appt-info'>Not Available</p>
    };
  };

  // reformat date, start and end times to display nicely on DOM
  let date = DateTime.fromISO(appointmentDetails.start_time).toFormat('LLLL dd, yyyy');
  let startTime = DateTime.fromISO(appointmentDetails.start_time).toFormat('h:mm a');
  let endTime = DateTime.fromISO(appointmentDetails.end_time).toFormat('h:mm a');

  return (
    <div>
      <div className="card">

        <h1>Appointment Details</h1>
        <hr></hr>
        <img src="https://media.istockphoto.com/photos/confident-african-american-female-doctor-isolated-picture-id175399910?k=20&m=175399910&s=612x612&w=0&h=fLjDqCS348updNvF1z6wdiTnGkD-CLHxtiH6a5Lw4wg="
          alt="Provider Image"></img>
        <p id='provider'>Dr. {appointmentDetails.first_name} {appointmentDetails.last_name}</p>
        <p id='specialty'>{appointmentDetails.specialty}</p>
        <p className='gray-title'>Date</p>
        <p className='appt-info'>{date}</p>
        <p className='gray-title'>Time</p>
        <p className='appt-info'>{startTime} to {endTime}</p>
        <p className='gray-title'>Health System</p>
        <p className='appt-info'>{appointmentDetails.health_system}</p>
        <p className='gray-title'>Location</p>
        <p className='appt-info'>{appointmentDetails.address}, {appointmentDetails.state} {appointmentDetails.zip_code}</p>
        <p className='gray-title'>Telemedicine</p>
        {determineTelemedicineAvailability()}

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
