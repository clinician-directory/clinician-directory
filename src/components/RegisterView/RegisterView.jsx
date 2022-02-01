import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './RegisterView.css';

function RegisterView() {

    function handleRegisterButton () {
        console.log('CLICK');
    }

  return (
    <div>
        <form onSubmit={handleRegisterButton}>



        </form>
    </div>
  );
}

export default RegisterView;
