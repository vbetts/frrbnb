from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS

application = FlaskAPI(__name__)
CORS(application)

"""
What URL should trigger this function
"""

# add a rule for the index page.
@application.route('/')
def hello():
    return {'items' : 'hello world'}


if __name__ == "__main__":
     application.run()
