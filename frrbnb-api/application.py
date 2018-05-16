from flask import request, url_for, g
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS
from validation import CITIES, PROPERTY_TYPES, PET_TYPES, validate_required_fields, validate_search, validate_pets, format_msgs, is_host
from handle_data import query_db, get_host_accounts, get_account_by_id, get_host_pets, get_account_pets, get_account_bookings 

import sqlite3

application = FlaskAPI(__name__)
CORS(application)

@application.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# add a rule for the index page.
@application.route('/')
def hello():
    accounts = get_host_accounts()
    return {"accounts": accounts}

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
        message_str = format_msgs(msgs)
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
                
                host_pet_id = query_db(pet_sql, pet_args, False, True)

                if host_pet_id:
                    price_sql = "INSERT INTO prices(account_id, host_pet_id, price) VALUES(?, ?, ?)"
                    price_args = account_id, host_pet_id, price
                    price_id = query_db(price_sql, price_args, False, True)
                    if price_id:
                        successmsg = "Successfully created host account for {}!"
                        successmsg = successmsg.format(name)
                        return { "error" : False, "messages" : successmsg } 

    else:
        return {"error" : True, "messages" : "There was an error creating your account. Please try again."}

@application.route('/search', methods=['POST', 'GET', 'OPTIONS'])
def search():
    data = request.get_json()
    if data is None:
        return {}
    messages = validate_search(data)
    if len(messages) > 0:
        msgs = format_msgs(messages)
        accounts = get_host_accounts()
        return {"error": True, "messages": msgs, "accounts": accounts}

    accounts = get_host_accounts(data["city_id"], data["petType"], data["propertyType"])
    if len(accounts) == 0:
        return {"error": False, "messages": "No results", "accounts": accounts}

    return {"error": False, "messages": "", "accounts": accounts}


@application.route('/profile', methods=['POST', 'GET', 'OPTIONS'])
def profile():
    data = request.get_json()
    if data is None:
        return {}
    account_data = get_account_by_id(data["account_id"])
    host_pets = get_host_pets(account_id)
    account_pets = get_account_pets(account_id)
    account_bookings = get_account_bookings(account_id)
    return {"error": False, 
            "messages": "", 
            "account_data": account_data, 
            "host_pets": host_pets, 
            "account_pets": account_pets, 
            "bookings": account_bookings}

if __name__ == "__main__":
     application.run()
