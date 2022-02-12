import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Card, CardActionArea, CardMedia, Typography, Table, TableHead, TableRow, TableCell, TableBody, CardContent, TableContainer, Paper } from "@material-ui/core";

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

import TableContainer from '@mui/material/TableContainer';

import doc1 from './doc1.jpeg'
import './ChooseProvider.css';
import Navigation from '../Navigation/Navigation';
import swal from 'sweetalert';

function ChooseProvider() {

  const history = useHistory();
  const dispatch = useDispatch();
  // access appointment start in query string and set equal to variable
  // access appointment end in query string and set equal to variable
  const search = useLocation().search;
  const appointmentStart = new URLSearchParams(search).get('appointment_start');
  const appointmentEnd = new URLSearchParams(search).get('appointment_end');
  console.log(appointmentStart);

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)

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

  const handleSchedule = (provider) => {
  // google calendar click feature

  let gapi = window.gapi;
  let CLIENT_ID = process.env.CLIENT_ID;
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
        })

    })
  };

     //button
  function handleScheduleButton(provider){
      console.log('inside schedule button, provider clicked is:', provider.id);
      dispatch({
          type: 'SET_ONE_PROVIDER',
          payload: {provider}
      })
      history.push('/appointment_details/:id')
  }


  return (
    <div>
      <form>
        <h3 className="providers">List of providers</h3>

      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, fontSize: 10, backgroundColor: '##bd9dcc', marginBottom: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"> <Typography variant="h6" > FIRST NAME </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> LAST NAME </Typography> </TableCell>
              <TableCell align="right"> <Typography variant="h6"> SPECIALTY </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> TELEMEDICINE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> CITY </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> HEALTH SYSTEM </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> ADDRESS </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> STATE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"> ZIP CODE </Typography></TableCell>
              <TableCell align="right"> <Typography variant="h6"></Typography></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>

              {providers.map((provider) => {
                console.log('inside MAP', provider)
                      return (
                          <TableRow key={provider.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{provider.first_name}</TableCell>
                                <TableCell align="center">{provider.last_name}</TableCell>
                                <TableCell align="center">{provider.specialty}</TableCell>
                                <TableCell align="center">{provider.telemedicine}</TableCell>
                                <TableCell align="center">{provider.city}</TableCell>
                                <TableCell align="center">{provider.health_system}</TableCell>
                                <TableCell align="center">{provider.address}</TableCell>
                                <TableCell align="center">{provider.state}</TableCell>
                                <TableCell align="center">{provider.zip_code}</TableCell>
                                <TableCell align="center"><button onClick={ () => handleSchedule(provider)}>Schedule!</button></TableCell>

                          </TableRow>
                      )})}
                  </TableBody>
          </Table>
        </TableContainer>

        <Navigation/>

    </div> //end div
  )//end return

}

export default ChooseProvider;
