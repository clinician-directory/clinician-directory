
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navigation from '../Navigation/Navigation';
// import css file
import './CalendarMonth.css';


function CalendarMonth() {
  // Define dispatch
  const dispatch = useDispatch();
  // Define history in order to route to page
  const history = useHistory();
  // Grab reducers from the redux store via useSelector
  const userAppointments = useSelector((store) => store.appointmentsReducer);
  const availabilities = useSelector((store) => store.availabilitiesReducer);
  const clickedAvailability = useSelector((store) => store.clickedAvailability);

  

  // on page load fetch provider availabilities and user appointments
  // useEffect allows us to dispatch a call with type and send the payload data for a particular submission
  // we want to use the GET route via our fetchAvailabilities and fetchUserAppointments sagas in availabilities.saga.js and appointments.saga.js
  useEffect(() => {

    dispatch({ type: 'FETCH_AVAILABILITIES' })
    dispatch({ type: 'FETCH_USER_APPOINTMENTS' });
  }, []);

  // variable to hold user appts in array
  const userApptsForCalendar = [];
  // variable to hold availabilities in array
  const availabilitiesForCalendar = [];

  // function to add user appointments to array
  function addApptsToCalendar() {
    userAppointments.map(appointment => {
      userApptsForCalendar.push({ id: appointment.id, title: 'Your Appt', start: appointment.start_time, color: 'blue' });
    });
    return userApptsForCalendar;
  };

  // function to add provider availabilities to array
  function addAvailabilitiesToCalendar() {
    availabilities.map(availability => {
      availabilitiesForCalendar.push({ title: 'Providers Available', start: availability.start_time, color: 'green' });
    });
    return availabilitiesForCalendar;
  };

  // call functions to populate user appointments and provider availabilities arrays
  addApptsToCalendar();
  addAvailabilitiesToCalendar();

  function handleDateClick(value) {
    console.log('CLICK!', value.dateStr);
  };

  // function to handle click of event on calendar
  function handleCalendarEventClick(event) {
    console.log('in handleCalendarEventClick', event);
    // send user to provider page if availability on calendar is clicked (color green)
    // if (event.el.fcSeg.eventRange.ui.backgroundColor === 'green') {
    //   history.push('/day');
    // }
    dispatch({
      type: 'LOAD_AVAILABILITIES',
      payload: availabilities
    })
  };

  return (
    <div className="container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        weekends={true}
        slotMinTime={'08:00:00'}
        slotMaxTime={'22:00:00'}
        // combine appt and availability arrays
        events={[...userApptsForCalendar, ...availabilitiesForCalendar]}

        dateClick={handleDateClick}
        // source https://fullcalendar.io/docs/eventClick
        eventClick={(event) => handleCalendarEventClick()}
      />

      {/* Calendar Key */}
      <div className="calendar-key">
        <p className="key">Key</p>
        <ul className="dot1">
          <li id="blue-dot">Your Appointments</li>
          <li id="green-dot">Available Appointments</li>
        </ul>
      </div>

      <Navigation />


    </div>
  );
}

export default CalendarMonth;
