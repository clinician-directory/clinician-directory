import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import ChooseProvider from '../ChooseProvider/ChooseProvider';
import AppointmentDetails from '../AppointmentDetails/AppointmentDetails';


import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';
import TopAppBar from '../TopAppBar/TopAppBar';

import './App.css';
import ChooseProviderTable from '../ChooseProvider/ChooseProviderTable';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>

        <TopAppBar />

        <Switch>

          {/* If no path is provided, just try to navigate to /user */}
          <Redirect exact from='/' to='/user' />

          {/* USER/PROFILE VIEW */}
          <ProtectedRoute exact path='/user'>
            {user.id ?
              <UserPage />
              :
              <Redirect to='/login' />
            }
          </ProtectedRoute>

          {/* CALENDAR VIEW - MONTH */}
          <ProtectedRoute exact path='/calendar'>
            {user.id ?
              <CalendarMonth />
              :
              <Redirect to='/login' />
            }
          </ProtectedRoute>

          {/* PROVIDER VIEW */}
          <ProtectedRoute exact path='/provider'>
            {user.id ?
              <ChooseProvider />
              :
              <Redirect to='/login' />
            }
          </ProtectedRoute>

          {/* APPOINTMENT DETAILS VIEW */}
          <ProtectedRoute exact path='/appointment_details/:id'>
            {user.id ?
              <AppointmentDetails />
              :
              <Redirect to='/login' />
            }
          </ProtectedRoute>

          {/* LOGIN VIEW */}
          <Route exact path='/login'>
            <LoginView />
          </Route>

          {/* REGISTER VIEW */}
          <Route exact path='/register'>
            <RegisterView />
          </Route>


          {/* <Route exact path='/test'>
            <CalendarDay />
          </Route> */}

          <Route exact path='/ptable'>
            <ChooseProviderTable />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
