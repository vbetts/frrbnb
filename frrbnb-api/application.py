from flask import request, session, url_for, g
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS
import time
from werkzeug.security import generate_password_hash, check_password_hash
from validation import *
from handle_data import * 
from secrets import KEY
import sqlite3

application = FlaskAPI(__name__)

application.secret_key = KEY

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
    return {"accounts": accounts,}

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

    hashed_pw = generate_password_hash(password)
    login_time = int(time.time())
    args = email, name, hashed_pw, city_id, desc, is_host, property_type, login_time

    sql = "INSERT INTO accounts(email, name, password, city_id, lat, lon, description, is_host, property_type, last_login) VALUES(?, ?, ?, ?, null, null, ?, ?, ?, ?)"
    account_id = query_db(sql, args, False, True)

    if account_id:
        if data["photo"] is not None:
            photo_sql = "INSERT INTO photos(account_id, img_path) values(?, ?)"
            photo_id = query_db(photo_sql, (account_id, data["photo"]), False, True)
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
    host_pets = get_host_pets(data["account_id"])
    account_pets = get_account_pets(data["account_id"])
    account_bookings = get_account_bookings(data["account_id"])
    account_photos = get_account_photos(data["account_id"])
    return {"error": False, 
            "messages": "", 
            "account_data": account_data, 
            "host_pets": host_pets, 
            "account_pets": account_pets,
            "account_photos": account_photos,
            "bookings": account_bookings}

@application.route('/login', methods=['POST', 'GET', 'OPTIONS'])
def login():
    data = request.get_json()
    if data is None:
        return {}
    if data["login_check"] == True:
        if "userid" in session:
            userdata = get_account_by_id(session["userid"])
            bookings = get_account_bookings(session["userid"], True)
            if userdata is not None:
                return {"errResponse"           : False,
                        "msgResponse"           : "",
                        "loggedIn"              : True,
                        "loggedInUsername"      : userdata["name"],
                        "loggedInId"            : userdata["id"],
                        "bookingChanges"   : bookings}
            else:
                logout()
                return {"errResponse"           : True,
                        "msgResponse"           : "There was an error. You have been logged out.",
                        "loggedIn"              : False,
                        "loggedInUsername"      : None,
                        "loggedInId"            : None,
                        "bookingChanges"   : None}

        else:
            return {"errResponse"           : False,
                    "msgResponse"           : "",
                    "loggedIn"              : False,
                    "loggedInUsername"      : None,
                    "loggedInId"            : None,
                    "bookingChanges"   : None}
    userdata = get_account_by_email(data["email"])
    if userdata is not None:
        if check_password_hash(userdata["password"], data["password"]):
            session['userid'] = userdata['id']
            login_time = int(time.time())
            login_sql = "UPDATE accounts SET last_login=? WHERE id=?"
            login_args = login_time, userdata["id"]
            login_update = query_db(login_sql, login_args)
            bookings = get_account_bookings(userdata["id"], True)
            return {"errResponse"           : False,
                    "msgResponse"           : "",
                    "loggedIn"              : True,
                    "loggedInUsername"      : userdata["name"],
                    "loggedInId"            : userdata["id"],
                    "bookingChanges"   : bookings}
        else:
            return {"errResponse"           : True,
                    "msgResponse"           : "Password does not match email address",
                    "loggedIn"              : False,
                    "loggedInUsername"      : None,
                    "loggedInId"            : None,
                    "bookingChanges"   : None}

    logout()
    return {"errResponse"           : True,
            "msgResponse"           : "There was an error. You have been logged out.",
            "loggedIn"              : False,
            "loggedInUsername"      : None,
            "loggedInId"            : None,
            "bookingChanges"   : None}

@application.route('/logout', methods=['POST', 'GET', 'OPTIONS'])
def logout():
    data = request.get_json()
    if data is None:
        return {}
    session.pop('userid', None)
    return {"error": False,
            "messages": "",
            "loggedIn": False,
            "loggedInUsername": None,
            "loggedInId": None}

if __name__ == "__main__":
    application.run()
