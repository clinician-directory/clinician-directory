import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// MUI imports
import { Button, Grid } from '@mui/material';
// import to reformat date and time
import { DateTime } from "luxon";
import { format } from 'date-fns';
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

  /* function to append YES or NO to DOM depending 
  on if provider has telemedicine option */
  function determineTelemedicineAvailability() {
    if (appointmentDetails.telemedicine) {
      return <p className='appt-info'>Available</p>
    } else {
      return <p className='appt-info'>Not Available</p>
    };
  };

  // // function to reformat appt date
  // function reformatApptDate() {
  //   // reformat dates in order to send to db
  //   const dateToSlice = appointmentDetails.start_time;
  //   const dateToFormat = dateToSlice.slice(0,20);
  //   const date = format(dateToFormat, 'yyyy/MM/dd');
  //   return date;
  // };


  // console.log('appointmentDetails.date', appointmentDetails.date);
  // const startTimeToFormat = appointmentDetails.start_time;

  // let startTime = DateTime.fromISO(appointmentDetails.start_time);
  // // let startTime = startTimeToFormat.toLocaleString(DateTime.DATETIME_FULL);

  // // let startTime = DateTime.fromFormat(`${startTimeToFormat}`, "MMMM d yyyy");
  // // DateTime.fromISO(startTime).toFormat('yyyy LLL dd');
  // console.log('appointmentDetails.start_time', startTime);
  // console.log('appointmentDetails.end_time', appointmentDetails.end_time);

  return (
    <div>
      <div className="card">

        <h1>Appointment Details</h1>
        <hr></hr>
        <img src="https://media.istockphoto.com/photos/confident-african-american-female-doctor-isolated-picture-id175399910?k=20&m=175399910&s=612x612&w=0&h=fLjDqCS348updNvF1z6wdiTnGkD-CLHxtiH6a5Lw4wg=" 
        alt="Provider Image"></img>
        <p id='provider'>Dr. {appointmentDetails.first_name} {appointmentDetails.last_name}</p>
        <p id='specialty'>{appointmentDetails.specialty}</p>
        <p className='gray-title'>Date & Time</p>
        <p className='appt-info'>{appointmentDetails.date} from {appointmentDetails.start_time} to {appointmentDetails.end_time}</p>
        <p className='gray-title'>Description</p>
        <p className='appt-info'>{appointmentDetails.description}</p>
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
