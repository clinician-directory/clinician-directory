import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import './LoginView.css';

function LoginPage() {

  const history = useHistory();

  return (
    <div>
        <Grid container id='login-card'>
        </Grid>
    </div>
  );
}

export default LoginPage;
