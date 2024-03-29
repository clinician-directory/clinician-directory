import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Paper from '@mui/material/Paper';

function Navigation() {

    const history = useHistory();
    const dispatch = useDispatch();

    const currentTab = useSelector(store => store.currentTabReducer)

    function handleTabClick(value) {
        dispatch(
            { 
                type: 'SET_TAB', 
                payload: value 
            }
        )
        switch (value) {
            case 0: history.push('/user');
                break;
            case 1: history.push('/calendar');
                break;
            case 2: history.push('/provider');
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels value={currentTab} onChange={(event, value) => { handleTabClick(value)}}>
                    <BottomNavigationAction label='Profile' icon={<PersonIcon />} />
                    <BottomNavigationAction label='Calendar' icon={<DateRangeIcon />} />
                    {/* NOT MVP */}
                    {/* <BottomNavigationAction label='Providers' icon={<LocalHospitalIcon />} /> */}
                </BottomNavigation>
            </Paper>
        </div>
    );

}

export default Navigation;