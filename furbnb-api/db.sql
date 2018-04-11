/*
 * FrrBnB Database Script
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
---Insert property types
INSERT INTO cities VALUES (0, 'guelph');
INSERT INTO cities VALUES (1, 'kitchener');
INSERT INTO cities VALUES (2, 'waterloo');
INSERT INTO cities VALUES (3, 'cambridge');

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
	property_type INTEGER NOT NULL,
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
	account_id INTEGER NOT NULL,
	type_id INTEGER NOT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(type_id) REFERENCES pet_types(id)
);

---Price
CREATE TABLE price(
	price_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	type_id INTEGER NOT NULL,
	price REAL DEFAULT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(type_id) REFERENCES pet_types(id)
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
	msg_date INTEGER NOT NULL,
	msg TEXT NOT NULL,
	FOREIGN KEY(from_id) REFERENCES accounts(id),
	FOREIGN KEY(to_id) REFERENCES accounts(id)
);

---Pets
CREATE TABLE pets(
	pet_id INTEGER PRIMARY KEY,
	account_id INTEGER NOT NULL,
	type_id INTEGER NOT NULL,
	birthdate INTEGER DEFAULT NULL,
	name TEXT DEFAULT NULL,
	FOREIGN KEY(account_id) REFERENCES accounts(id),
	FOREIGN KEY(type_id) REFERENCES pet_types(id)
);

---Bookings
CREATE TABLE bookings(
	booking_id INTEGER PRIMARY KEY,
	host_id INTEGER NOT NULL,
	client_id INTEGER NOT NULL,
	from_date INTEGER NOT NULL,
	to_date INTEGER NOT NULL,
	date_booked INTEGER NOT NULL,
	confirmed INTEGER DEFAULT 0,
	notes TEXT DEFAULT NULL,
	FOREIGN KEY(host_id) REFERENCES accounts(id),
	FOREIGN KEY(client_id) REFERENCES accounts(id)
);

---Reviews
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
