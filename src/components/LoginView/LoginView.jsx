import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './LoginView.css';

function LoginView() {

    // Define Library Variables
    const dispatch = useDispatch();
    const history = useHistory();

    // Define Local States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Login Button Function
    function handleLoginButton(event) {
        event.preventDefault();
        if (username && password) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    username: username,
                    password: password,
                },
            });
            history.push('/user')
        } else {
            alert('Please populate all required fields.')
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };

    // Register Button Function
    function handleRegisterButton() {
        history.push('/register');
    };

    return (
        <div>
            <form onSubmit={handleLoginButton}>

                <Grid container id='grid-container-background' direction='column' justifyContent='flex-start' alignItems='center' spacing={2}>

                    <Grid item>
                        <Typography variant='h6'>Welcome to Clinician Directory!</Typography>
                    </Grid>
                    <Grid item id='grid-item-inputs'>
                        <Grid container direction='column' spacing={2}>
                            <Grid item>
                                <TextField required value={username} onChange={(event) => setUsername(event.target.value)} label='Email' />
                            </Grid>
                            <Grid item>
                                <TextField required value={password} onChange={(event) => setPassword(event.target.value)} type='password' label='Password' />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item id='grid-item-buttons'>
                        <Grid container direction='row' spacing={2}>
                            <Grid item>
                                <Button variant='outlined' onClick={handleRegisterButton}>Register</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' onClick={handleLoginButton}>Log In</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <input type='submit' hidden />

            </form>
        </div>
    );
}

export default LoginView;
