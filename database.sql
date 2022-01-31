--Create Database table titled: "clinician_directory"
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (200) NOT NULL,
    "first_name" VARCHAR (1000) NOT NULL,
    "last_name" VARCHAR (1000) NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" VARCHAR (1000) NOT NULL,
    "city" VARCHAR (1000) NOT NULL,
    "state" VARCHAR (4) NOT NULL,
    "zip_code" INTEGER NOT NULL
);

-------------------------------------------------------------

CREATE TABLE "appointments" (
    "id" SERIAL PRIMARY KEY,
    "user_id"  INT REFERENCES "user" (id) ON DELETE CASCADE NOT NULL,
    "start_time" TIMESTAMP,
    "end_time" TIMESTAMP,
    "provider_id"  INT REFERENCES "providers" (id) ON DELETE CASCADE NOT NULL,
    "description" VARCHAR (1000) NOT NULL
    
);
-------------------------------------------------------------

CREATE TABLE "providers" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (1000) NOT NULL,
    "last_name" VARCHAR (1000) NOT NULL,
    "specialty" VARCHAR (1000) NOT NULL,
    "telemedicine" BOOLEAN,
    "city" VARCHAR (1000) NOT NULL,
    "health_system" VARCHAR (1000) NOT NULL,
    "address" VARCHAR (1000) NOT NULL,
    "state" VARCHAR (4) NOT NULL,
    "zip_code" VARCHAR (1000) NOT NULL

);

-------------------------------------------------------------

CREATE TABLE "availabilities" (
    "id" SERIAL PRIMARY KEY,
    "start_time" TIMESTAMP,
    "provider_id"  INT REFERENCES "providers" (id) ON DELETE CASCADE NOT NULL,
    "end_time" TIMESTAMP,
    "day" INT NOT NULL
);