import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SweetAlert from 'sweetalert';

import './RegisterView.css';

function RegisterView() {

    // Define Library Variables
    const dispatch = useDispatch();
    const history = useHistory();

    // Define Local States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegisterButton () {

        if (username && password && password === confirmPassword) {
            dispatch({
                type: 'REGISTER',
                payload: {
                    username: username,
                    password: password,
                },
            });
            SweetAlert({
                title: 'New account has been created.',
                icon: 'success',
            });
            history.push('/user');
        }
        else {
            alert('Please enter a valid username and password, and try again.')
        }

    }

    function handleCancelButton () {
        history.push('/login');
    }

  return (
    <div>
        <form onSubmit={handleRegisterButton}>

            <Grid container id='grid-container-background' direction='column' justifyContent='flex-start' alignItems='center' spacing={2}>

                <Grid item> 
                    <Typography variant='h6'>New User Registration</Typography>
                </Grid>

                <Grid item id='grid-item-inputs'>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField required value={username} onChange={(event) => setUsername(event.target.value)} label='New Email' />
                        </Grid>
                        <Grid item>
                            <TextField required value={password} onChange={(event) => setPassword(event.target.value)} type='password' label='New Password' />
                        </Grid>
                        <Grid item>
                            <TextField required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type='password' label='Confirm Password' />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item id='grid-item-buttons'>
                    <Grid container direction='row' spacing={2}>
                        <Grid item>
                            <Button variant='outlined' onClick={handleCancelButton}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleRegisterButton}>Register</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </form>
    </div>
  );
}

export default RegisterView;
