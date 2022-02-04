import React from 'react';
import {useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import './ChooseProvider.css';
import Navigation from '../Navigation/Navigation';
import swal from 'sweetalert';

function ChooseProvider() {

  const history = useHistory();
  const dispatch = useDispatch();

  //handles button to go to calendar view
  // const handleSchedule = () => {
  //   history.push('/calendarmonth')
  // }

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)
  //const selectedProvider = useSelector(store => store.OneProviderReducer)

  //creating local states for clinicians to enter in new providers to add to the database

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROVIDERS' })
  }, [])

      // *Warren's google calendar click feature

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
  {/* <button onClick={handleGoogleClick}>New Google Calendar Event</button> */}

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
  return (
    <div>
    <form>
      <h3 className="providers">List of providers</h3>
    </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, fontSize: 10, backgroundColor:'##bd9dcc', marginBottom: 10 }} aria-label="simple table">
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
              {providers.map((allProviders) => {
                console.log('inside MAP', allProviders)
                      return (
                          <TableRow key={allProviders.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{allProviders.first_name}</TableCell>
                                <TableCell align="center">{allProviders.last_name}</TableCell>
                                <TableCell align="center">{allProviders.specialty}</TableCell>
                                <TableCell align="center">{allProviders.telemedicine}</TableCell>
                                <TableCell align="center">{allProviders.city}</TableCell>
                                <TableCell align="center">{allProviders.health_system}</TableCell>
                                <TableCell align="center">{allProviders.address}</TableCell>
                                <TableCell align="center">{allProviders.state}</TableCell>
                                <TableCell align="center">{allProviders.zip_code}</TableCell>
                                <TableCell align="center"><button onClick={handleSchedule}>Schedule!</button></TableCell>
                          </TableRow>
                      )})}
                  </TableBody>
          </Table>
        </TableContainer>
        <Navigation/>
    </div>
      )//end return
}

export default ChooseProvider;
