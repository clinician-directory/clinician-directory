import React from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box';
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




import './ChooseProvider.css';
import Navigation from '../Navigation/Navigation';
//import favicon from '..../public/favicon.ico'


        
    //{allProviders.first_name} 
    //{allProviders.last_name} 
    //{allProviders.specialty} 
    //{allProviders.telemedicine}
    //{allProviders.city}
    //{allProviders.health_system}
    //{allProviders.address}
    //{allProviders.state}
    //{allProviders.zip_code}

    //TO MAP THROUGH PROVIDERS FROM DB 
    // {providers.map((allProviders) => {
    //     return ( 
    //         {allProviders.first_name} 
    //         )})}   
    ///                                
    //   {providers.map((allProviders) => {
    //     console.log('inside MAP', allProviders)
    //           return (  )})}



function ChooseProviderTable() {

    const dispatch = useDispatch();
    const history = useHistory();

      //Accessing Redux/Reducer
    const providers = useSelector(store => store.allProvidersReducer)
    const provider = useSelector(store => store.oneProvidersReducer)


    const search = useLocation().search;
    const appointmentStart = new URLSearchParams(search).get('appointment_start');
    const appointmentEnd = new URLSearchParams(search).get('appointment_end');

      //button
      function handleScheduleButton(provider){
          console.log('inside schedule button, provider clicked is:', providers.id);
          dispatch({
              type: 'SET_ONE_PROVIDER',
              payload: provider.id
          })
          history.push('/appointment_details/:id')
      }

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
              })
      
          })
      };




    return(

        

        <div>
           
            <h1> Providers Table </h1>


            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      {providers.map((provider) => {
         return ( 
            <ListItem key={provider.id} >
            <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
  
          <ListItemText primary={provider.first_name + " " + provider.last_name} secondary={provider.address + " " + provider.state + " " + provider.zip_code + " " + "Specialty:" + " " + provider.specialty}/>
          <Button variant="outlined" onClick={()=>handleSchedule(provider)}>Schedule</Button>
            </ListItem>
            )})};
            
      
    
         </List>

         <Navigation />
     
         <Navigation/>
      
    

        </div>

  
                 


        
    )
}

export default ChooseProviderTable;