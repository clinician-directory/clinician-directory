-- Sample data

INSERT INTO "user"
  ("username", "password")
  VALUES
  ('testpatient@email.com', '$2a$10$V7dIK6uoviuxbyjDphwewOQYRxIpPu50CzlbqkTOykty09xuRvRSW'); --password: 123

-------------------------------------------------------------

INSERT INTO "providers"
  ("first_name", "last_name", "specialty", "telemedicine", "city", "health_system", "address", "state", "zip_code")
  VALUES
  ('Olivia', 'Smith', 'PM&R', 'true', 'St. Cloud', 'CentraCare', '1900 CentraCare Circle St. Cloud', 'MN', '56303'),
  ('Emma', 'Johnson', 'Orthopedics', 'true', 'St. Cloud', 'CentraCare', '811 2nd Street Southeast Little Falls', 'MN', 'MN 56345');

-------------------------------------------------------------

INSERT INTO "appointments"
  ("user_id", "start_time", "end_time", "provider_id", "description")
  VALUES
  ('1', '2022-04-10 12:30:00', '2022-04-10 13:00:00', '2', 'ankle pain');

-------------------------------------------------------------

INSERT INTO "availabilities"
("start_time", "provider_id", "end_time", "day")
VALUES
('2022-02-10 12:30:00', '1', '2022-02-10 13:00:00', '1');
