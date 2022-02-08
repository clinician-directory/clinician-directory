### TO DO

- [x] protect routes

### Appt Details View
- [x] add appt dummy data to DB & seedData file
- [x] create appt details component & add path in app.jsx
On click of appt on calendar
  - [x] send user to appt details page with appt id
When arrive on details page
  - [x] dispatch to FETCH appt details w/ payload of params.id
  - [x] create saga function to intercept dispatch and send get request to server
  - [x] create route on server side to get appt details by id
  - [x] create reducer to hold user appt details
  - [x] in saga function, update reducer to hold appt details
  - [ ] import reducer, map through and display appt details on DOM