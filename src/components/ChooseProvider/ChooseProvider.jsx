import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import doc1 from './doc1.jpeg'
import './ChooseProvider.css';
import Navigation from '../Navigation/Navigation';
import swal from 'sweetalert';

function ChooseProvider() {

  const history = useHistory();
  const dispatch = useDispatch();
  // access appointment start in query string and set equal to variable
  const search = useLocation().search;
  const appointmentStart = new URLSearchParams(search).get('appointment_start');

  //handles button to go to calendar view
  // const handleSchedule = () => {
  //   history.push('/calendarmonth')
  // }

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)
  const provider = useSelector(store => store.oneProvidersReducer)

  //const selectedProvider = useSelector(store => store.OneProviderReducer)

  //creating local states for clinicians to enter in new providers to add to the database

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    // dispatch({ type: 'FETCH_ALL_PROVIDERS' })

    // send dispatch with appointment start query to FETCH ALL AVAILABLE PROVIDERS
    dispatch({ 
      type: 'FETCH_ALL_AVAILABLE_PROVIDERS',
      payload: appointmentStart
    });
  }, [])

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
      { 'email': 'justin.lewis.cummings@gmail.com' },
      { 'email': 'yasir.uddin@icloud.com' },
      { 'email': 'selamtalem@gmail.com' },
      { 'email': 'kbrown55347@gmail.com' }
    ],
    'reminders': {
      'useDefault': true
    }
  };
  {/* <button onClick={handleGoogleClick}>New Google Calendar Event</button> */ }

  const handleSchedule = (e) => {

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
        })

    })
  };

     //button
     function handleScheduleButton(providers){
      console.log('inside schedule button, provider clicked is:', providers.id);
      dispatch({
          type: 'FETCH_THIS_ONE_PROVIDER',
          payload: providers.id
      })
      history.push('/appointment_details/:id')
  }


  return (
    <div>
      <form>
        <h3 className="providers">List of providers</h3>

      </form>
        <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper'}}>
          {providers.map((provider) => {
            console.log('hellooooooo');
            return ( 
              <ListItem key={provider.id} >
                <ListItemAvatar>
                  <Avatar src={doc1}/>
                    
                  
                </ListItemAvatar>
      
              <ListItemText primary={provider.first_name + " " + provider.last_name} secondary={provider.address + " " + provider.state + " " + provider.zip_code + " " + "Specialty:" + " " + provider.specialty}/>
                <Button variant="contained" color="success" onClick={handleScheduleButton} > Schedule </Button>
              </ListItem>
            )})};
        </List>
        <Navigation/>
      </div> //end div
    
    


    
      )//end return

  //   <div className="container">
    
  //     <h2> These are providers available!</h2>
  //     <p>Name</p>
  //     <p>Specialty</p>
  //     <p>address</p>
  //     <div>
  //       <ul>
  //     {providers.map((allProviders) => {
  //       return (
  //         <div>
  //         <p>
  //           {allProviders.first_name} {allProviders.last_name}
  //            {allProviders.specialty} {allProviders.telemedicine}
  //            {allProviders.city} {allProviders.city} {allProviders.health_system}
  //            {allProviders.address} {allProviders.state}{allProviders.zip_code}
  //         </p>
  //         </div>
  //       )
  //     })}

  //     </ul>
  //     </div>
   
      
  //     <button onClick={handleSchedule}>Schedule Appointment!</button>
  //   </div>
  // );

}

export default ChooseProvider;
