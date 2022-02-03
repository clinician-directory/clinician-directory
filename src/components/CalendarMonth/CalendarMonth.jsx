import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navigation from "../Navigation/Navigation";

function CalendarMonth() {
  // Define dispatch
  const dispatch = useDispatch();
  // Define history in order to route to page
  const history = useHistory();
  // to access reducers in this component
  // Grab reducers from the redux store via useSelector
  const userAppointments = useSelector((store) => store.appointmentsReducer);
  const availabilities = useSelector((store) => store.availabilitiesReducer);

  // testing GET appointments route response from DB
  // on page load fetch provider availabilities and user appointments
  // useEffect allows us to dispatch a call with type and send the payload data for a particular submission
  // we want to use the GET route via our fetchAvailabilities and fetchUserAppointments sagas in availabilities.saga.js and appointments.saga.js
  useEffect(() => {
    dispatch({ type: "FETCH_AVAILABILITIES" });
    dispatch({ type: "FETCH_USER_APPOINTMENTS" });
  }, []);

  
  let gapi = window.gapi;
  let CLIENT_ID =
    "1096656813980-v8ibiouk9dg649om7og02kr5kuied9fq.apps.googleusercontent.com";
  let API_KEY = process.env.API_KEY;
  // Array of API discovery doc URLs for APIs used by the quickstart
  let DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  let SCOPES = "https://www.googleapis.com/auth/calendar";

  // variable to hold array of events on calendar
  const apptsAndAvailabilities = [];

  // KELSEY'S ORIGINAL CODE FOR ADDING APPOINTMENTS ONLY
  // // function to add user appointments to array for Calendar
  // function addApptsToCalendar() {
  //   // map through userAppointments
  //   userAppointments.map(appointment => {
  //     // push object to array
  //     apptsAndAvailabilities.push({title: 'Your Appt', start: appointment.start_time, color: 'yellow'});
  //   });
  //   console.log(apptsAndAvailabilities);
  //   // return array
  //   return apptsAndAvailabilities;
  // };
  //   // call addApptsToCalendar to populate user appointments on table
  //   addApptsToCalendar();

  // function to add user appointments and provider availabilities to array for Calendar
  
  
  function addApptsAndAvailabilitiesToCalendar() {
    // map through userAppointments
    userAppointments.map((appointment) => {
      // push object to array
      apptsAndAvailabilities.push({
        title: "Your Appt",
        start: appointment.start_time,
        color: "yellow",
      });
    });
    // map through availabilities
    availabilities.map((availability) => {
      // push object to array
      apptsAndAvailabilities.push({
        title: "Providers Available",
        start: availability.start_time,
        color: "green",
      });
    });
    console.log(apptsAndAvailabilities);
    // return array
    return apptsAndAvailabilities;
  }
  // call addApptsToCalendar to populate user appointments and provider availablities on table
  addApptsAndAvailabilitiesToCalendar();

  function handleDateClick(value) {
    console.log("CLICK!", value.dateStr);

  }

  // route to provider page when provider availability or user appointment is clicked on the calendar
  // function handleApptsAndAvailabilities() {
  //   history.push('/day');
  // }

  //Selam testing functions
  const handleApptsAndAvailabilities = (availabilities) => {
    console.log('clicked on time:', availabilities.id);
    dispatch({
      type: 'SET_ONE_AVAILABILITY',
      payload: availabilities.id
    })
    history.push('/day');
  }


  let event = {
    summary: "Clinician Directory Meet&Greet!",
    location: "Somewhere Near You",
    description: "I made this event from the google API. SPIKE COMPLETE",
    start: {
      dateTime: "2022-01-29T09:00:00-07:00",
      timeZone: "US/Central",
    },
    end: {
      dateTime: "2022-01-29T17:00:00-07:00",
      timeZone: "US/Central",
    },
    attendees: [
      { email: "justin.lewis.cummings@gmail.com" },
      { email: "yasir.uddin@icloud.com" },
      { email: "selamtalem@gmail.com" },
      { email: "kbrown55347@gmail.com" },
    ],
    reminders: {
      useDefault: true,
    },
  };

  function handleGoogleClick() {
    gapi.load("client:auth2", () => {
      console.log("Loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("YAAAAAAAZZZZ"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log("Success!");

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <div className="container">
      <p>Info Page</p>
      <button onClick={handleGoogleClick}>New Google Calendar Event</button>
      <FullCalendar  key={availabilities.id}//Selam testing - adding key value to test on grabbing availability by click
        plugins={[dayGridPlugin, interactionPlugin]}
        weekends={true}
        slotMinTime={"08:00:00"}
        slotMaxTime={"22:00:00"}
        events={apptsAndAvailabilities}
        dateClick={handleDateClick}
        // source https://fullcalendar.io/docs/eventClick
        eventClick={e => handleApptsAndAvailabilities(availabilities)} //Selam testing grabbing availability by click 
        //eventClick={handleApptsAndAvailabilities} // -- original call for click
      />

      <Navigation />
    </div>
  );
}

export default CalendarMonth;
