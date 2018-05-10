from flask import request, url_for, g
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS
import sqlite3

application = FlaskAPI(__name__)
CORS(application)

# Constants
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
    """
        Converts row data from sqlite into dicts
    """
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db():
    """
         Load the database connection
    """
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = dict_factory
    return db

# Query the database
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
    if fields["city_id"] == "":
        messages.append(message_template.format("City"))
    if fields["email"] == "":
        messages.append(message_template.format("Email"))
    elif "@" not in fields["email"]:
        messages.append("Invalid email")
    else:
        email_sql = "SELECT id FROM accounts WHERE email=?"
        email_res = query_db(email_sql, (fields["email"],), True)
        if email_res is not None:
            m = "An account is already associated with the email: {}"
            m = m.format(fields["email"])
            messages.append(m)
    if fields["name"] == "":
        messages.append(message_template.format("Name"))
    if fields["password"] == "":
        messages.append(message_template.format("Password"))
    if len(fields["password"]) <= 3: 
       messages.append("Password must be greater than 3 characters") 
    if fields["password"] != fields["password_retype"]:
        messages.append("The password fields do not match")
    if fields["is_host"] == True: 
        if fields["property_type"] == "":
            messages.append(message_template.format("Property Type") + " for host accounts")
        else:
            messages.extend(validate_pets(fields["pets"]))
    return messages

def validate_pets(pets):
    messages = []
    if len(pets) == 0:
        messages.append("Host accounts must list at least one (1) type of eligible pet")
    for pet in pets:
        if pet["petType"] is None:
            messages.append("There was an error with your pet data: please select a pet type")
        else:
            pet_type = int(pet["petType"])
            if not (pet_type in PET_TYPES):
                messages.append("There was an error with your pet data: please select a valid pet type")
    return messages

def get_host_accounts(city=None, pet_type=None):
    sql = "SELECT * FROM accounts WHERE accounts.is_host=1"
    args = ()
    if pet_type is not None:
        sql = "SELECT * FROM accounts INNER JOIN host_pet_types AS p ON p.account_id = accounts.id WHERE accounts.is_host=1 AND p.pet_type_id=? "
        args = args + (pet_type,)
    if city is not None:
        sql += " AND city_id=?"
        args = args + (city,)

    accounts = query_db(sql, args)
    return accounts

@application.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# add a rule for the index page.
@application.route('/')
def hello():
    accounts = get_host_accounts()
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
    is_host = data["is_host"]
    property_type = data["property_type"]

    msgs = validate_required_fields(data)

    if len(msgs) > 0:
        message_str = "<br />".join(msgs)
        return {"error" : True, "messages" : message_str}
    
    args = email, name, password, city_id, desc, is_host, property_type

    sql = "INSERT INTO accounts(email, name, password, city_id, lat, lon, description, is_host, property_type) VALUES(?, ?, ?, ?, null, null, ?, ?, ?)"
    account_id = query_db(sql, args, False, True)

    if account_id:
        if is_host == False:
            successmsg = "Successfully created account for {}!"
            successmsg = successmsg.format(name)
            return { "error" : False, "messages" : successmsg } 
        else:
            for pet in data["pets"]:
                pet_type_id = int(pet["petType"])
                #Price stored in cents, so multiply by 100
                price = int(pet["petPrice"]) * 100

                pet_sql = "INSERT INTO host_pet_types(account_id, pet_type_id) VALUES(?, ?)"
                pet_args = account_id, pet_type_id
                price_sql = "INSERT INTO prices(account_id, pet_type_id, price) VALUES(?, ?, ?)"
                price_args = account_id, pet_type_id, price

                query_db(pet_sql, pet_args, False, True)
                price_id = query_db(price_sql, price_args, False, True)
                if price_id:
                    successmsg = "Successfully created host account for {}!"
                    successmsg = successmsg.format(name)
                    return { "error" : False, "messages" : successmsg } 

    else:
        return {"error" : True, "messages" : "There was an error creating your account. Please try again."}


if __name__ == "__main__":
     application.run()
