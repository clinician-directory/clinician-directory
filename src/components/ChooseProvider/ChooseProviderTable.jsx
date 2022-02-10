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

      //button
      function handleButton(){
          history.push('/')
      }


{/* <Navigation/>  */}

    return(

        

        <div>
           
            <h1> Providers Table </h1>


            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      {providers.map((provider) => {
          console.log('hellooooooo');
         return ( 
            <ListItem key={provider.id} >
            <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
  
          <ListItemText primary={provider.first_name + " " + provider.last_name} secondary={provider.address + " " + provider.state + " " + provider.zip_code + " " + "Specialty:" + " " + provider.specialty}/>
          <Button variant="outlined" onClick={handleButton}> Schedule</Button>
            </ListItem>
            )})};
            
      
    
         </List>
     
       
      
    
        </div>

  
                 


        
    )
}

export default ChooseProviderTable;