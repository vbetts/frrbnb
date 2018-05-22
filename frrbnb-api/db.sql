/*
 * FrrBnB Database Schema
 */

/*
 * ENUMS
 */
---Pet Types enum
CREATE TABLE pet_types(
	id INTEGER PRIMARY KEY,
	pet_type TEXT NOT NULL
);
---Insert pet types
INSERT INTO pet_types VALUES (0, 'cat');
INSERT INTO pet_types VALUES (1, 'small');
INSERT INTO pet_types VALUES (2, 'medium');
INSERT INTO pet_types VALUES (3, 'large');

---Property Types enum
CREATE TABLE property_types(
	id INTEGER PRIMARY KEY,
	property_type TEXT NOT NULL
);
---Insert property types
INSERT INTO property_types VALUES (0, 'rural');
INSERT INTO property_types VALUES (1, 'urban');
INSERT INTO property_types VALUES (2, 'suburban');

---Cities enum
CREATE TABLE cities(
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);
---Insert cities
INSERT INTO cities VALUES (0, 'victoria');
INSERT INTO cities VALUES (1, 'sooke');
INSERT INTO cities VALUES (2, 'nanaimo');
INSERT INTO cities VALUES (3, 'tofino');

/**********************************************************************/
/*
 * DATA TABLES
 */
---Accounts
CREATE TABLE accounts(
	id INTEGER PRIMARY KEY,
	email TEXT NOT NULL,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	city_id INTEGER NOT NULL,
	lat TEXT DEFAULT NULL,
	lon TEXT DEFAULT NULL,
	description TEXT DEFAULT NULL,
	is_host INTEGER DEFAULT 0,
	property_type INTEGER DEFAULT NULL,
	suspended INTEGER DEFAULT 0,
	FOREIGN KEY(city_id) REFERENCES cities(id),
	FOREIGN KEY(property_type) REFERENCES property_types(id)
);

INSERT INTO accounts VALUES (
	NULL,
	'toribetts@gmail.com',
	'Tori Betts',
	'password',
	0,
	null,
	null,
	null,
	1,
	1,
	0
);
---Pet types to host
CREATE TABLE host_pet_types(
	host_pet_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	pet_type_id INTEGER NOT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(pet_type_id) REFERENCES pet_types(id)
);

---Price per night
CREATE TABLE prices(
	price_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	host_pet_id INTEGER NOT NULL,
	price INTEGER DEFAULT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(host_pet_id) REFERENCES host_pet_types(host_pet_id)
);

---Photo
CREATE TABLE photos(
	photo_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	description TEXT DEFAULT NULL,
	img_type INTEGER DEFAULT 0,
	img_path TEXT NOT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id)
);

---Messages
CREATE TABLE messages(
	message_id INTEGER PRIMARY KEY,
	from_id INTEGER NOT NULL,
	to_id INTEGER NOT NULL,
	subject TEXT NOT NULL,
	sent_timestamp INTEGER NOT NULL,
	content TEXT NOT NULL,
	FOREIGN KEY(from_id) REFERENCES accounts(id),
	FOREIGN KEY(to_id) REFERENCES accounts(id)
);

---Pets
CREATE TABLE pets(
	pet_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	pet_type_id INTEGER NOT NULL,
	birth_date TEXT DEFAULT NULL,
	name TEXT DEFAULT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(pet_type_id) REFERENCES pet_types(id)
);

---Bookings
CREATE TABLE bookings(
	booking_id INTEGER PRIMARY KEY,
	host_id INTEGER NOT NULL,
	client_id INTEGER NOT NULL,
	from_date TEXT NOT NULL,
	to_date TEXT NOT NULL,
	creation_timestamp INTEGER NOT NULL,
	confirmed INTEGER DEFAULT 0,
	notes TEXT DEFAULT NULL,
	FOREIGN KEY(host_id) REFERENCES accounts(id),
	FOREIGN KEY(client_id) REFERENCES accounts(id)
);

---Reviews
--- rating: integer from 0 - 5 (inclusive)
CREATE TABLE reviews(
	review_id INTEGER PRIMARY KEY,
	reviewer_id INTEGER NOT NULL,
	reviewed_id INTEGER NOT NULL,
	booking_id INTEGER NOT NULL,
	rating INTEGER DEFAULT 0,
	review TEXT DEFAULT NULL,
	FOREIGN KEY(reviewer_id) REFERENCES accounts(id),
	FOREIGN KEY(reviewed_id) REFERENCES accounts(id),
	FOREIGN KEY(booking_id) REFERENCES bookings(booking_id)
);
