import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Navigation from '../Navigation/Navigation';

import SweetAlert from 'sweetalert';

import './UserPage.css';
import Header from '../Header/Header';


function UserPage() {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [zipCode, setZipCode] = useState(user.zip_code || '');

  const handleSchedule = (value) => {
    dispatch({ type: 'SET_TAB', payload: value })
    history.push('/calendar')
  }

  function handleSaveButton() {
    const updatedUser = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      address: address,
      city: city,
      state: state,
      zip_code: zipCode
    }
    dispatch({
      type: 'EDIT_USER',
      payload: updatedUser
    });
    SweetAlert({
      title: 'Profile has been updated!',
      icon: 'success',
    });
  }

  return (
    <div>
      <Header  label = "User Profile" />
      <Grid container id='grid-container-text-fields' direction='column' spacing={2}>
        <Grid item>
          <TextField value={firstName} onChange={(event)=>setFirstName(event.target.value)} label='First Name' />
        </Grid>
        <Grid item>
          <TextField value={lastName} onChange={(event)=>setLastName(event.target.value)} label='Last Name' />
        </Grid>
        <Grid item>
          <TextField value={phone} onChange={(event)=>setPhone(event.target.value)} label='Phone' />
        </Grid>
        <Grid item>
          <TextField value={address} onChange={(event)=>setAddress(event.target.value)} label='Address' />
        </Grid>
        <Grid item>
          <TextField value={city} onChange={(event)=>setCity(event.target.value)} label='City' />
        </Grid>
        <Grid item>
          <TextField value={state} onChange={(event)=>setState(event.target.value)} label='State' />
        </Grid>
        <Grid item>
          <TextField value={zipCode} onChange={(event)=>setZipCode(event.target.value)} label='Zip Code' />
        </Grid>
        <Grid item>
          <Button variant='outlined' onClick={handleSaveButton}>Save Changes</Button>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={()=>handleSchedule(1)}>Schedule an Appointment</Button>
        </Grid>
      </Grid>
      <Navigation/>
    </div>
  );
}

export default UserPage;
