import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// sweet alert import
import SweetAlert from 'sweetalert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
// import to reformat date and time
import { DateTime } from "luxon";

import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

import image1 from './doc1.jpeg';

function ChooseProviderTable() {

  const dispatch = useDispatch();
  const history = useHistory();

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer);

  const search = useLocation().search;
  const appointmentStart = new URLSearchParams(search).get('appointment_start');
  const appointmentEnd = new URLSearchParams(search).get('appointment_end');

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    // dispatch({ type: 'FETCH_ALL_PROVIDERS' })
    // send dispatch with appointment start query to FETCH ALL AVAILABLE PROVIDERS
    dispatch({
      type: 'FETCH_ALL_AVAILABLE_PROVIDERS',
      payload: appointmentStart
    });
  }, [])

  //button
  const handleSchedule = (provider) => {

    // google calendar click feature
    let gapi = window.gapi;
    let CLIENT_ID = '1096656813980-v8ibiouk9dg649om7og02kr5kuied9fq.apps.googleusercontent.com';
    let API_KEY = process.env.API_KEY;
    // // Array of API discovery doc URLs for APIs used by the quickstart
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // // Authorization scopes required by the API; multiple scopes can be
    // // included, separated by spaces.
    let SCOPES = "https://www.googleapis.com/auth/calendar";

    let event = {
      'summary': 'You have an appointment!',
      'location': `${provider.address}`,
      'description': `Appointment with ${provider.first_name} ${provider.last_name}`,
      'start': {

        // 'dateTime': '2022-01-29T09:00:00',
        'dateTime': appointmentStart,
        'timeZone': 'US/Central'
      },
      'end': {
        // 'dateTime': '2022-01-29T17:00:00',
        'dateTime': appointmentEnd,

        'timeZone': 'US/Central'
      },
      'reminders': {
        'useDefault': true
      }
    };
    gapi.load('client:auth2', () => {
      console.log('Loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })

      gapi.client.load('calendar', 'v3', () => console.log('YAAAAAAAZZZZ'))

      gapi.auth2.getAuthInstance().signIn()
        .then(() => {

          console.log('Success!');

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          });

          request.execute(event => {
            console.log(event);
          })

        })
        .catch((error) => {
          console.log(error);
        });

      // bundle appointment info into object
      const appointmentToBook = { appointmentStart: appointmentStart, appointmentEnd: appointmentEnd, providerId: provider.id };
      // send object to saga function
      dispatch({
        type: 'APPOINTMENT_TO_BOOK',
        payload: appointmentToBook
      });
      // book appt confirmation alert
      SweetAlert({
        title: 'Success!',
        text: 'Your appointment has been booked. Sign into your Google account to create a Google Calendar event.',
        icon: 'success',
      });
      // send user to calendar view
      history.push('/calendar');
    });
  };

  // reformat date and start time to display nicely on DOM
  let date = DateTime.fromISO(appointmentStart).toFormat('LLLL dd, yyyy');
  let appointmentStartTime = DateTime.fromISO(appointmentStart).toFormat('h:mm a');


  return (

    <div>
      <Header label={`Select Provider for ${date} at ${appointmentStartTime}`} />

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {providers.map((provider) => {
          return (
            <ListItem key={provider.id} >

              <ListItemAvatar>
                <Avatar src={provider.image_url}/>
              </ListItemAvatar>

              <ListItemText primary={provider.first_name + " " + provider.last_name} secondary={provider.address + " " + provider.state + " " + provider.zip_code + " " + "Specialty:" + " " + provider.specialty} />
              <Button variant="outlined" onClick={() => handleSchedule(provider)}>Schedule</Button>
            </ListItem>
          )
        })}
      </List>

      <Navigation />

    </div>
  )
};

export default ChooseProviderTable;