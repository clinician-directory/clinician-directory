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



function ChooseProvider() {



  const history = useHistory();
  const dispatch = useDispatch();


  //handles button to go to calendar view
  const handleSchedule = () => {
    history.push('/calendarmonth')
  }

  //Accessing Redux/Reducer
  const providers = useSelector(store => store.allProvidersReducer)
  //const selectedProvider = useSelector(store => store.OneProviderReducer)

  //creating local states for clinicians to enter in new providers to add to the database

  // TO RUN ON PAGE LOAD
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PROVIDERS' })
  }, [])  


  return (
    <div>

    <form>
      <h3 className="providers">List of providers</h3>
    
    {/* <Box sx={{ minWidth: 115 }} className="specialtyBox" >
      <FormControl sx={{ minWidth: 155,  marginLeft: 60, marginBottom: -4, backgroundColor: "white", marginTop: -7}}  >
        <InputLabel sx={{ marginLeft: 2, marginTop: -0}} id="demo-simple-select-label" >Specialty </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{height: 55}}
            value={providers.specialty}
            label="Specialty"
            onChange={(event) => setSpecialty(event.target.value)}>
              <MenuItem value="PM&R">PM&R</MenuItem>
              <MenuItem value="Orthopedics">Orthopedics</MenuItem>
              <MenuItem value="Psychology">Psychology</MenuItem>
              <MenuItem value="Family Medicine">Family Medicine</MenuItem>
              <MenuItem value="Physical Therapy">Physical Therapy</MenuItem>

          </Select>
      </FormControl>
    </Box> */}
    </form>
    
    {/* <Button 
    variant="outlined"
     style={{
      backgroundColor: "#4caf50",
      height: 55,
      color: "white",
      marginLeft: 800,
      marginTop: -80,
      marginBottom: 35,
      marginLeft: 677
    }}
            
    onClick={(event) => { onSelectProvider(event) }}>Select Provider/Button> */}
    
    
    
    
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
                          </TableRow>
                      )})}
                  </TableBody>
          </Table>
        </TableContainer>
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
