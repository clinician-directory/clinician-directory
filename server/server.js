const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

const availabilitiesRouter = require('./routes/availabilities.router');

// require in appointments router
const appointmentsRouter = require('./routes/appointments.router');
const providersRouter = require('./routes/providers.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

// created a new route for availabilities. Check out 'availablities.router.js' for more details.
app.use('/api/availabilities', availabilitiesRouter);
// appointments route. Check out 'appointments.router.js' for more details.
app.use('/api/appointments', appointmentsRouter);
// providers route. Check out 'providers.router.js' for more details.
app.use('/api/providers', providersRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
