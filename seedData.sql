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


INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '8:00AM', '8:30AM', "day"
FROM "availabilities"
WHERE "availabilities"."8:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '8:30AM', '9:00AM', "day"
FROM "availabilities"
WHERE "availabilities"."8:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '9:00AM', '9:30AM', "day"
FROM "availabilities"
WHERE "availabilities"."9:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '9:30AM', '10:00AM', "day"
FROM "availabilities"
WHERE "availabilities"."9:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '10:00AM', '10:30AM', "day"
FROM "availabilities"
WHERE "availabilities"."10:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '10:30AM', '11:00AM', "day"
FROM "availabilities"
WHERE "availabilities"."10:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '11:00AM', '11:30AM', "day"
FROM "availabilities"
WHERE "availabilities"."11:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '11:30AM', '12:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."11:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '12:00PM', '12:30PM', "day"
FROM "availabilities"
WHERE "availabilities"."12:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '12:30PM', '1:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."12:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '1:00PM', '1:30PM', "day"
FROM "availabilities"
WHERE "availabilities"."1:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '1:30PM', '2:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."1:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '2:00PM', '2:30PM', "day"
FROM "availabilities"
WHERE "availabilities"."2:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '2:30PM', '3:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."2:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '3:00PM', '3:30PM', "day"
FROM "availabilities"
WHERE "availabilities"."3:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '3:30PM', '4:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."3:30" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '4:00PM', '4:30PM', "day"
FROM "availabilities"
WHERE "availabilities"."4:00" = true;

INSERT INTO "test_availabilities" ("provider_id", "start_time", "end_time", "day")
SELECT "provider_id", '4:30PM', '5:00PM', "day"
FROM "availabilities"
WHERE "availabilities"."4:30" = true;