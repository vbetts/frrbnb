from flask import request, url_for, g
from flask_api import FlaskAPI, status, exceptions
from constants import CITIES, PROPERTY_TYPES, PET_TYPES
import sqlite3

# Constants
DATABASE = './frrbnb.sqlt'

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
    """
        Executes database queries
        :param      query:      the sqlite query to be executed
        :type       query:      string with '?' placeholders for args
        :param      args:       arguments to be passed into the query
        :type       args:       sequence
        :param      one:        flag indicating that only one row of data should be returned
        :type       one:        bool
        :param      insert:     flag for insert queries (different return values)
        :type       insert:     bool
        :return     row data
        :rtype      dict
    """
    cur = get_db().execute(query, args)
    if insert is False:
        rv = cur.fetchall()
    else:
        get_db().commit()
        rv = cur.lastrowid
    cur.close()
    return (rv[0] if rv else None) if one else rv


def get_host_accounts(city=None, pet_type=None, property_type=None):
    """
        Generates sql and runs dbquery to retrieve account data for host accounts
        :param      city:           city id (constant)
        :type       city:           int
        :param      pet_type:       pet type id (constant)
        :type       pet_type:       int
        :param      property_type:  property type id (constant)
        :type       property_type:  int
        :return     host accounts formatted for return to the client side
        :rtype      array of dicts
    """
    sql = "SELECT * FROM accounts WHERE accounts.is_host=1"
    args = ()
    if pet_type is not None:
        sql = "SELECT * FROM accounts INNER JOIN host_pet_types AS p ON p.account_id = accounts.id WHERE accounts.is_host=1 AND p.pet_type_id=?"
        args = args + (pet_type,)
    if city is not None:
        sql += " AND city_id=?"
        args = args + (city,)
    if property_type is not None:
        sql += " AND property_type=?"
        args = args + (property_type,)

    accounts = query_db(sql, args)
    accounts = format_accounts(accounts)
    return accounts

def get_account_by_id(account_id):
    """
        Generates sql and runs dbquery to retrieve account data for host accounts
        :param      account_id:           unique profile id
        :type       account_id:           int
        :return     single account matching account_id argument
        :rtype      dict
    """
    account = []
    if account_id is not None:
        sql = "SELECT * FROM accounts WHERE accounts.id=?"
        args = (account_id,)
        account = account.append(query_db(sql, args, True, False))
        formatted = format_accounts(account)
        return formatted[0]
    return account

def get_host_pets(account_id):
    """
        Generates sql and runs dbquery to retrieve account data for pets to be hosted by account
        :param      account_id:           unique profile id
        :type       account_id:           int
        :return     array of pet dicts
        :rtype      array
    """
    if account_id is not None:
        sql = "SELECT * FROM host_pet_types AS pets "
        sql += "INNER JOIN prices ON prices.host_pet_id = pets.host_pet_id "
        sql += "WHERE pets.account_id=?"
        args = (account_id,)
        host_pets = query_db(sql, args)
        return host_pets
    else:
        return []

def get_account_pets(account_id):
    """
        Generates sql and runs dbquery to retrieve account data for pets owned by user
        :param      account_id:           unique profile id
        :type       account_id:           int
        :return     array of pet dicts
        :rtype      array
    """
    if account_id is not None:
        sql = "SELECT * FROM pets WHERE account_id=?"
        args = (account_id,)
        pets = query_db(sql, args)
        return pets
    else:
        return []

def get_account_bookings(account_id, start_date=None, end_date=None):
    """
        Generates sql and runs dbquery to retrieve booking data by account ID with optional timeframe arguments
        :param      account_id:      unique profile id
        :type       account_id:     int
        :param      start_date:     start date in format: "YYYY-MM-DD"
        :type       start_date:     string
        :param      end_date:       end date in format: "YYYY-MM-DD"
        :type       end_date:       string
        :return     array of booking dicts
        :rtype      array
    """
    sql = "SELECT * FROM bookings WHERE host_id=? OR client_id=?"
    
    args = account_id, account_id,

    bookings = query_db(sql, args)

    return bookings
    

def format_accounts(accounts):
    """
        Formats account fields for return to the client side
        :param      accounts:   list of accounts returned by get_host_accounts or get_account_by_id
        :type       accounts:   array of dicts
                        keys:   
                            id                  int 
                            email               int
                            lat                 string or None
                            lon                 string or None
                            is_host             int (1 or 0)
                            name                string
                            password            string
                            password_retype     string
                            suspended           int (1 or 0)
                            property_type       int or None
                            description         string or None
                            city_id             int
        :return     host accounts formatted for return to the client side
        :rtype      array of dicts
    """
    for account in accounts:
        account['city'] = CITIES[account['city_id']] 
        account['property_type'] = PROPERTY_TYPES[account['property_type']]
    return accounts

