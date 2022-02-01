import React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin from '@fullcalendar/interaction';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is
// Testing to make sure Git is updated

function CalendarMonth() {

  let gapi = window.gapi;
  let CLIENT_ID = '1096656813980-v8ibiouk9dg649om7og02kr5kuied9fq.apps.googleusercontent.com';
  let API_KEY = process.env.API_KEY;

    // Array of API discovery doc URLs for APIs used by the quickstart
  let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
  let SCOPES = "https://www.googleapis.com/auth/calendar";

  const calendarId = 1

  function handleDateClick(value) {
    console.log('CLICK!', value.dateStr);
  }

  let event = {
    'summary': 'Clinician Directory Meet&Greet!',
    'location': 'Somewhere Near You',
    'description': 'I made this event from the google API. SPIKE COMPLETE',
    'start': {
      'dateTime': '2022-01-29T09:00:00-07:00',
      'timeZone': 'US/Central'
    },
    'end': {
      'dateTime': '2022-01-29T17:00:00-07:00',
      'timeZone': 'US/Central'
    },
    'attendees': [
      {'email': 'justin.lewis.cummings@gmail.com'},
      {'email': 'yasir.uddin@icloud.com'},
      {'email': 'selamtalem@gmail.com'},
      {'email': 'kbrown55347@gmail.com'}
    ],
    'reminders': {
      'useDefault': true
    }
  };

  function handleGoogleClick() {
    gapi.load('client:auth2', () => {
      console.log('Loaded client');


      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load('calendar', 'v3', ()=> console.log('YAAAAAAAZZZZ'))

      gapi.auth2.getAuthInstance().signIn()
        .then(()=>{

          console.log('Success!');

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          });

          request.execute(event => {
            console.log(event);
          })

        })
        .catch((error)=>{
          console.log(error);
        })

    })
  }

  return (
    <div className="container">
      <p>Info Page</p>
      <button onClick={handleGoogleClick}>New Google Calendar Event</button>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          weekends={true}
          slotMinTime={'08:00:00'}
          slotMaxTime={'22:00:00'}
          events={calendarId}
          dateClick={handleDateClick}
        />
    </div>
  );
}

export default CalendarMonth;
