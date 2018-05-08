from flask import request, url_for, g
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS
import sqlite3

application = FlaskAPI(__name__)
CORS(application)

"""
What URL should trigger this function
"""
DATABASE = './frrbnb.sqlt'

CITIES = {
    0 : "guelph",
    1 : "kitchener",
    2 : "waterloo",
    3 : "cambridge"
}

PROPERTY_TYPES = {
    0 : "rural",
    1 : "urban",
    2 : "suburban"
}

PET_TYPES = {
    0 : "cat", 
    1 : "small dog", 
    2 : "medium dog", 
    3 : "large dog"
}

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = dict_factory
    return db

def query_db(query, args=(), one=False, insert=False):
    cur = get_db().execute(query, args)
    if insert is False:
        rv = cur.fetchall()
    else:
        get_db().commit()
        rv = cur.lastrowid
    cur.close()
    return (rv[0] if rv else None) if one else rv

def validate_required_fields(fields):
    messages = []
    message_template = "'{}' is a required field"
    if fields.city_id.strip() == "":
        messages.append(message_template.format("City"))
    if fields.email.strip() == "":
        messages.append(message_template.format("Email"))
    if fields.name.strip() == "":
        messages.append(message_template.format("Name"))
    if fields.password.strip() == "":
        messages.append(message_template.format("Password"))
    if len(fields.password.strip()) <= 3: 
       messages.append("Password must be greater than 3 characters") 
    if fields.password.strip() != fields.password_retype.strip():
        messages.append("The password fields do not match")
    if fields.createHost == "true" and fields.selectedPropertyType.strip() == "":
        messages.append(message_template.format("Property Type") + " for host accounts")
    return messages

def validate_pets(pets):
    messages = []
    if len(pets) == 0:
        messages.append("Host accounts must list at least one (1) type of eligible pet")
    for pet in pets:
        if int(pet.petType) == 1 and pet.petSize == "null":
            messages.append("There was an error with your pet data: dogs must have a size selected.")
        if not (int(pet.petType) in PET_TYPES) or (int(pet.petType) == 1 and not (int(pet.petSize) in PET_TYPES)):
            messages.append("There was an error with your pet data: please select valid pet types and sizes")
    return messages
    
@application.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# add a rule for the index page.
@application.route('/')
def hello():
    accounts = query_db('select * from accounts')
    for account in accounts:
        account['city'] = CITIES[account['city_id']] 
        account['property_type'] = PROPERTY_TYPES[account['property_type']]

    return accounts

@application.route('/create', methods=['POST', 'GET', 'OPTIONS'])
def create_account():
    data = request.get_json()
    if data is None:
        return {}
    email = data["email"]
    name = data["name"]
    password = data["password"]
    city_id = data["city_id"]
    desc = data["description"]
    is_host = True if data["is_host"] == "true" else False
    property_type = data["property_type"]

    args = email, name, password, city_id, desc, is_host, property_type

    sql = "INSERT INTO accounts(email, name, password, city_id, lat, lon, description, is_host, property_type) VALUES(?, ?, ?, ?, null, null, ?, ?, ?)"
    account_id = query_db(sql, args, False, True)
    if (account_id):
        return { "accountid" : account_id}
    else:
        return {"this" : "is balls"}


if __name__ == "__main__":
     application.run()
