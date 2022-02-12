import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// MUI imports
import { Button, Grid } from '@mui/material';
// MUI imports for cancel appointment dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import to reformat date and time
import { DateTime } from "luxon";
// sweet alert import
import SweetAlert from 'sweetalert';
// import css page
import './AppointmentDetails.css';
import Header from '../Header/Header';


// for MUI cancel appointment dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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


  // for MUI cancel appointment dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // on click of YES CANCEL button in MUI cancel appointment dialog
  const handleYesCancelClick = () => {
    // dispatch to saga to delete appointment
    dispatch({
      type: 'DELETE_APPOINTMENT',
      payload: params.id
    });
    // cancel appointment confirmation alert
    SweetAlert({
      title: 'Success! Your appointment has been cancelled.',
      icon: 'success',
    });
    // clear reducer
    dispatch({
      type: 'CLEAR_APPOINTMENT_DETAILS'
    });
    // send user to calendar view
    history.push('/calendar');
  };


  return (
    <div>
      <div className="card">

        <Header label="Appointment Details" />
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

      {/* cancel appointment button and MUI dialog */}
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleClickOpen}
        >
          CANCEL APPOINTMENT
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Cancel your appointment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Click CONFIRM to cancel your appointment.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>BACK</Button>
            <Button onClick={handleYesCancelClick}>CONFIRM</Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Navigation />

    </div>

  );
};

export default AppointmentDetails;
