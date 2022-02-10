DROP TABLE IF EXISTS "appointments";
DROP TABLE IF EXISTS "availabilities";
DROP TABLE IF EXISTS "providers";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" VARCHAR (200),
    "first_name" VARCHAR (1000),
    "last_name" VARCHAR (1000),
    "phone" INTEGER,
    "address" VARCHAR (1000),
    "city" VARCHAR (1000),
    "state" VARCHAR (4),
    "zip_code" INTEGER 
);

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

CREATE TABLE "availabilities" (
  "id" SERIAL PRIMARY KEY,
  "provider_id" integer REFERENCES "providers" (id) ON DELETE CASCADE,
  "start_time" timestamp without time zone,
  "end_time" timestamp without time zone
);

CREATE TABLE "appointments" (
  "id" SERIAL PRIMARY KEY,
  "start_time" timestamp without time zone,
  "end_time" timestamp without time zone,
  "provider_id"  INT REFERENCES "providers" (id) ON DELETE CASCADE NOT NULL
);

INSERT INTO "public"."user"("id","username","password","role","first_name","last_name","phone","address","city","state","zip_code")
VALUES
(1,E'guest',E'$2a$10$Lh6S5wmg9MWi5fuMEyrBBOcLz1ukeDkZ2SN5nsZMcsNXmJB6er3/6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);  
-- Password 1234

INSERT INTO "public"."providers"("id","first_name","last_name","specialty","telemedicine","city","health_system","address","state","zip_code")
VALUES
(1,E'Olivia',E'Smith',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'1900 CentraCare Circle St. Cloud',E' MN',E'56303'),
(2,E'Emma',E'Johnson',E'Orthopedics',TRUE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(3,E'Amelia',E'Williams',E'Physical Therapy',TRUE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(4,E'Ava',E'Brown',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(5,E'Sophia',E'Jones',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'1900 CentraCare Circle St. Cloud',E' MN',E'56303'),
(6,E'Charlotte',E'Garcia',E'Psychology',FALSE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(7,E'Isabella',E'Miller',E'Orthopedics',TRUE,E'St.Cloud',E'CentraCare',E'1107 Hart Boulevard Monticello',E' MN',E'55362'),
(8,E'Mia',E'Davis',E'Psychology',FALSE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(9,E'Luna',E'Rodriguez',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'1107 Hart Boulevard Monticello',E' MN',E'55362'),
(10,E'Harper',E'Martinez',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(11,E'Gianna',E'Hernandez',E'Psychology',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(12,E'Evelyn',E'Lopez',E'Physical Therapy',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(13,E'Aria',E'Gonzales',E'Orthopedics',FALSE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(14,E'Ella',E'Wilson',E'Psychology',TRUE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(15,E'Ellie',E'Anderson',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(16,E'Mila',E'Thomas',E'Psychology',TRUE,E'St.Cloud',E'CentraCare',E'1555 Northway Drive St. Cloud',E' MN',E'56303'),
(17,E'Layla',E'Taylor',E'Orthopedics',TRUE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(18,E'Avery',E'Moore',E'Orthopedics',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(19,E'Camila',E'Jackson',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(20,E'Lily',E'Martin',E'Psychology',FALSE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(21,E'Scarlett',E'Lee',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'1555 Northway Drive St. Cloud',E' MN',E'56303'),
(22,E'Sofia',E'Perez',E'Psychology',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(23,E'Nova',E'Thompson',E'Psychology',TRUE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(24,E'Aurora',E'White',E'Orthopedics',FALSE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(25,E'Chloe',E'Harris',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(26,E'Riley',E'Sanchez',E'Family Medicine',FALSE,E'Duluth',E'Essentia',E'4289 Ugstad Road Hermantown',E' MN',E'55811'),
(27,E'Nora',E'Clark',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(28,E'Hazel',E'Ramirez',E'Family Medicine',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(29,E'Abigail',E'Lewis',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(30,E'Rylee',E'Robinson',E'Orthopedics',TRUE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(31,E'Penelope',E'Walker',E'Physical Therapy',TRUE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(32,E'Elena',E'Young',E'Physical Therapy',TRUE,E'Duluth',E'Fairview',E'3605 Mayfair Avenue Hibbing',E' MN',E'55746'),
(33,E'Zoey',E'Allen',E'Physical Therapy',FALSE,E'Duluth',E'Fairview',E'3605 Mayfair Avenue Hibbing',E' MN',E'55746'),
(34,E'Isla',E'King',E'Family Medicine',FALSE,E'Duluth',E'Fairview',E'3605 Mayfair Avenue Hibbing',E' MN',E'55746'),
(35,E'Eleanor',E'Wright',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'1900 CentraCare Circle St. Cloud',E' MN',E'56303'),
(36,E'Elizabeth',E'Scott',E'Orthopedics',FALSE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(37,E'Madison',E'Torres',E'Family Medicine',TRUE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(38,E'Willow',E'Nguyen',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(39,E'Emilia',E'Hill',E'Family Medicine',TRUE,E'St.Cloud',E'CentraCare',E'1555 Northway Drive St. Cloud',E' MN',E'56303'),
(40,E'Violet',E'Flores',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(41,E'Emily',E'Green',E'Family Medicine',FALSE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(42,E'Eliana',E'Adams',E'Orthopedics',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(43,E'Stella',E'Nelson',E'Family Medicine',FALSE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(44,E'Maya',E'Baker',E'Orthopedics',TRUE,E'St.Cloud',E'CentraCare',E'1107 Hart Boulevard Monticello',E' MN',E'55362'),
(45,E'Paisley',E'Hall',E'Psychology',TRUE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(46,E'Everly',E'Rivera',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'1555 Northway Drive St. Cloud',E' MN',E'56303'),
(47,E'Addison',E'Campbell',E'Physical Therapy',FALSE,E'Duluth',E'Essentia',E'4289 Ugstad Road Hermantown',E' MN',E'55811'),
(48,E'Ryleigh',E'Mitchell',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(49,E'Ivy',E'Carter',E'Orthopedics',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(50,E'Grace',E'Roberts',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'1107 Hart Boulevard Monticello',E' MN',E'55362'),
(51,E'Liam',E'Gomez',E'Psychology',TRUE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(52,E'Noah',E'Phillips',E'Orthopedics',TRUE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(53,E'Oliver',E'Evans',E'Family Medicine',TRUE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(54,E'Elijah',E'Turner',E'Psychology',FALSE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(55,E'Lucas',E'Diaz',E'PM&R',TRUE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(56,E'Levi',E'Parker',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(57,E'Mason',E'Cruz',E'Orthopedics',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(58,E'Asher',E'Edwards',E'Psychology',FALSE,E'Duluth',E'Fairview',E'3605 Mayfair Avenue Hibbing',E' MN',E'55746'),
(59,E'James',E'Collins',E'Physical Therapy',TRUE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(60,E'Ethan',E'Reyes',E'Family Medicine',FALSE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(61,E'Mateo',E'Stewart',E'Psychology',TRUE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(62,E'Leo',E'Morris',E'Orthopedics',FALSE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(63,E'Jack',E'Morales',E'Physical Therapy',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(64,E'Benjamin',E'Murphy',E'Orthopedics',FALSE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(65,E'Aiden',E'Cook',E'PM&R',TRUE,E'Minneapolis',E'Fairview',E'480 Hwy 96 E. Vadnais Heights',E' MN',E'55127'),
(66,E'Logan',E'Rogers',E'Family Medicine',FALSE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(67,E'Grayson',E'Gutierrez',E'Orthopedics',TRUE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(68,E'Jackson',E'Ortiz',E'Family Medicine',FALSE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(69,E'Henry',E'Morgan',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(70,E'Wyatt',E'Cooper',E'Family Medicine',TRUE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(71,E'Sebastian',E'Peterson',E'PM&R',FALSE,E'Duluth',E'Essentia',E'4289 Ugstad Road Hermantown',E' MN',E'55811'),
(72,E'Carter',E'Bailey',E'Orthopedics',TRUE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(73,E'Daniel',E'Reed',E'PM&R',TRUE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(74,E'William',E'Kelly',E'Physical Therapy',TRUE,E'Duluth',E'Essentia',E'615 Pecan Ave. Duluth',E' MN',E'55811'),
(75,E'Alexander',E'Howard',E'Orthopedics',FALSE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(76,E'Ezra',E'Ramos',E'Orthopedics',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(77,E'Owen',E'Kim',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(78,E'Michael',E'Cox',E'Psychology',FALSE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(79,E'Muhammad',E'Ward',E'Family Medicine',TRUE,E'St.Cloud',E'Fairview',E'290 Main St NW',E' MN',E'55330'),
(80,E'Julian',E'Richardson',E'Family Medicine',TRUE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(81,E'Hudson',E'Watson',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'402 Red River Avenue North Cold Spring',E' MN',E'56320'),
(82,E'Luke',E'Brooks',E'Physical Therapy',FALSE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(83,E'Samuel',E'Chavez',E'Psychology',FALSE,E'Minneapolis',E'Mayo Clinic',E'200 First Street SW Rochester',E' MN',E'55905'),
(84,E'Jacob',E'Wood',E'Psychology',TRUE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(85,E'Lincoln',E'James',E'Family Medicine',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(86,E'Gabriel',E'Bennet',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'615 Nelson Drive Clearwater',E' MN',E'55320'),
(87,E'Jayden',E'Gray',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(88,E'Luca',E'Mendoza',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(89,E'Maverick',E'Ruiz',E'Physical Therapy',TRUE,E'Minneapolis',E'Fairview',E'480 Hwy 96 E. Vadnais Heights',E' MN',E'55127'),
(90,E'David',E'Hughes',E'PM&R',TRUE,E'St.Cloud',E'CentraCare',E'1360 Elm Street East St. Joseph',E' MN',E'56374'),
(91,E'Josiah',E'Price',E'Psychology',TRUE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(92,E'Elias',E'Alvarez',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345'),
(93,E'Jaxon',E'Castillo',E'Psychology',FALSE,E'St.Cloud',E'CentraCare',E'1900 CentraCare Circle St. Cloud',E' MN',E'56303'),
(94,E'Kai',E'Sanders',E'Physical Therapy',FALSE,E'St.Cloud',E'CentraCare',E'1107 Hart Boulevard Monticello',E' MN',E'55362'),
(95,E'Anthony',E'Patel',E'Family Medicine',FALSE,E'St.Cloud',E'CentraCare',E'1555 Northway Drive St. Cloud',E' MN',E'56303'),
(96,E'Isaiah',E'Myers',E'PM&R',FALSE,E'St.Cloud',E'CentraCare',E'1900 CentraCare Circle St. Cloud',E' MN',E'56303'),
(97,E'Eli',E'Long',E'PM&R',TRUE,E'Minneapolis',E'Fairview',E'980 Rice St.',E' MN',E'55117'),
(98,E'John',E'Ross',E'Orthopedics',TRUE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(99,E'Joseph',E'Foster',E'PM&R',FALSE,E'Minneapolis',E'Fairview',E'Southdale Place 3400 W. 66th St. Edina',E' MN',E'55435'),
(100,E'Matthew',E'Jimenez',E'Orthopedics',FALSE,E'St.Cloud',E'CentraCare',E'811 2nd Street Southeast Little Falls',E' MN',E'56345');

INSERT INTO "availabilities"
	("provider_id", "start_time", "end_time")
VALUES








	(1, '2022-02-10 09:00:00', '2022-02-10 09:29:59'),
	(1, '2022-02-10 09:30:00', '2022-02-10 09:59:59'),

	(1, '2022-02-10 10:00:00', '2022-02-10 10:29:59'),
	(1, '2022-02-10 10:30:00', '2022-02-10 10:59:59'),

	(1, '2022-02-11 09:00:00', '2022-02-11 09:29:59'),
	(1, '2022-02-11 09:30:00', '2022-02-11 09:59:59'),

	(1, '2022-02-11 10:00:00', '2022-02-11 10:29:59'),
	(1, '2022-02-11 10:30:00', '2022-02-11 10:59:59'),

	(2, '2022-02-10 09:00:00', '2022-02-10 09:29:59'),
	(2, '2022-02-10 09:30:00', '2022-02-10 09:59:59'),

	(2, '2022-02-10 10:00:00', '2022-02-10 10:29:59'),
	(2, '2022-02-10 10:30:00', '2022-02-10 10:59:59'),

	(2, '2022-02-11 09:00:00', '2022-02-11 09:29:59'),
	(2, '2022-02-11 09:30:00', '2022-02-11 09:59:59'),

	(2, '2022-02-11 10:00:00', '2022-02-11 10:29:59'),
	(2, '2022-02-11 10:30:00', '2022-02-11 10:59:59');