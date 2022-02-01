import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import './LoginView.css';

function LoginPage() {

  const history = useHistory();

  return (
    <div>
        <Grid container id='grid-container-background' direction='column' justifyContent='center' alignItems='center' spacing={2}>

            <Grid item id='grid-item-inputs' xs={6}>

                <Grid container id='grid-container-inputs' direction='column' spacing={2}>

                    <Grid item>
                        <TextField label="Email" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField type='password' label="Password" variant="outlined" />
                    </Grid>

                </Grid>

            </Grid>

            <Grid item id='grid-item-buttons' xs={4}>
                <Grid container id='grid-container-buttons'>
                </Grid>
            </Grid>





        </Grid>
    </div>
  );
}

export default LoginPage;
