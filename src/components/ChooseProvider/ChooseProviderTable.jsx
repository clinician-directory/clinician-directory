import React from 'react';
import {useHistory} from 'react-router-dom'
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

      //Accessing Redux/Reducer
    const providers = useSelector(store => store.allProvidersReducer)

    const history = useHistory();

    let gapi = window.gapi;
    let CLIENT_ID = '1096656813980-v8ibiouk9dg649om7og02kr5kuied9fq.apps.googleusercontent.com'
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
        'dateTime': '2022-02-11T09:00:00-07:00',
        'timeZone': 'US/Central'
      },
      'end': {
        'dateTime': '2022-02-11T17:00:00-07:00',
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

      //button
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
          <Button variant="outlined" onClick={handleSchedule}>Schedule</Button>
            </ListItem>
            )})};
            
      
    
         </List>
     
         <Navigation/>
      
    
        </div>

  
                 


        
    )
}

export default ChooseProviderTable;