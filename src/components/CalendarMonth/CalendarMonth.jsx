
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
      userApptsForCalendar.push({ id: appointment.id, title: 'Your Appt', start: appointment.start_time, color: 'purple' });
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
  function handleApptsAndAvailabilities(event) {
    console.log('in handleApptsAndAvailabilities', event);
    // send user to provider page if availability on calendar is clicked (color green)
    if (event.el.fcSeg.eventRange.ui.backgroundColor === 'green') {
      history.push('/day');
    }
    dispatch({
      type: 'LOAD_AVAILABILITIES',
      payload: availabilities
    })
  };

 

  // *Warren's google calendar click feature

  // let gapi = window.gapi;
  // let CLIENT_ID = '1096656813980-v8ibiouk9dg649om7og02kr5kuied9fq.apps.googleusercontent.com';
  // let API_KEY = process.env.API_KEY;
  // // Array of API discovery doc URLs for APIs used by the quickstart
  // let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // // Authorization scopes required by the API; multiple scopes can be
  // // included, separated by spaces.
  // let SCOPES = "https://www.googleapis.com/auth/calendar";

  // let event = {
  //   'summary': 'Clinician Directory Meet&Greet!',
  //   'location': 'Somewhere Near You',
  //   'description': 'I made this event from the google API. SPIKE COMPLETE',
  //   'start': {
  //     'dateTime': '2022-01-29T09:00:00-07:00',
  //     'timeZone': 'US/Central'
  //   },
  //   'end': {
  //     'dateTime': '2022-01-29T17:00:00-07:00',
  //     'timeZone': 'US/Central'
  //   },
  //   'attendees': [
  //     { 'email': 'justin.lewis.cummings@gmail.com' },
  //     { 'email': 'yasir.uddin@icloud.com' },
  //     { 'email': 'selamtalem@gmail.com' },
  //     { 'email': 'kbrown55347@gmail.com' }
  //   ],
  //   'reminders': {
  //     'useDefault': true
  //   }
  // };

  // function handleGoogleClick() {
  //   gapi.load('client:auth2', () => {
  //     console.log('Loaded client');


  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES
  //     })

  //     gapi.client.load('calendar', 'v3', () => console.log('YAAAAAAAZZZZ'))

  //     gapi.auth2.getAuthInstance().signIn()
  //       .then(() => {

  //         console.log('Success!');

  //         var request = gapi.client.calendar.events.insert({
  //           'calendarId': 'primary',
  //           'resource': event
  //         });

  //         request.execute(event => {
  //           console.log(event);
  //         })

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })

  //   })
  // };

  return (
    <div className="container">
      {/* <button onClick={handleGoogleClick}>New Google Calendar Event</button> */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        weekends={true}
        slotMinTime={'08:00:00'}
        slotMaxTime={'22:00:00'}
        // combine appt and availability arrays
        events={[...userApptsForCalendar, ...availabilitiesForCalendar]}

        dateClick={handleDateClick}
        // source https://fullcalendar.io/docs/eventClick
        eventClick={(e) => handleApptsAndAvailabilities(availabilities)} //Selam testing grabbing availability by click 
        //eventClick={handleApptsAndAvailabilities} // -- original call for click
      />
       

      {/* Calendar Key */}
      <div className="calendar-key">
        <p className="key">Key</p>
        <ul className="dot1">
          <li id="purple-dot">Your Appointments</li>
          <li id="green-dot">Available Appointments</li>
        </ul>
      </div>

      <Navigation />


    </div>
  );
}

export default CalendarMonth;
