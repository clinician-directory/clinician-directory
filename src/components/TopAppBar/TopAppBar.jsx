import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import './TopAppBar.css';

function TopAppBar() {

  // Define Library Variables
  const dispatch = useDispatch();
  const history = useHistory();

  // Log Out Button
  function handleLogOutButton() {
    dispatch({ type: 'LOGOUT' })
    history.push('/login')
  }

  return (
    <div>
      <AppBar id='app-bar' position='static'>

        <Grid container id='grid-container-app-bar' direction='row' justifyContent='center' alignItems='center' spacing={2}>
          <Grid item>
            <Typography variant='h4'>Clinician Directory</Typography>
          </Grid>
          <Grid item>
            <Button id='log-out-button' variant='outlined' onClick={handleLogOutButton}>Log Out</Button>
          </Grid>
        </Grid>

      </AppBar>
    </div>
  );
}

export default TopAppBar;