from flask import Flask
from handlers.flask_api import bookit_api
from handlers.get_workplace_info import get_user_data
from flask_cors import CORS
import os
from handlers import mongo_client
from handlers.populate_mock_db import PopulateDb
# import sys

# Gets the parameter from the CLI and checks if the application will be running for testing purposes.
# Defaults to be running in production unless specified
# try:
#     mongo_url = sys.argv[1]
# except IndexError:
#     mongo_url = "localhost"
#
# if mongo_url == "-test":
#     mongo_url = "db"
#     api_url = "127.0.0.1"
# else:
#     mongo_url = "localhost"
#     api_url = "0.0.0.0"


mongo_collections = mongo_client.initiate_mongo_client("localhost")
mock_collection = mongo_collections[0]
users_collection = mongo_collections[1]

app = Flask(__name__)
Populate_db = PopulateDb(mock_collection, users_collection)

bookit_api(app, mock_collection, users_collection)
CORS(app)

try:
    Populate_db.insert_empty_time_slots()
    print("INSERTED EMPTY TIME SLOTS")
except Exception:
    print("Empty time slots are already added!")

try:
    Populate_db.insert_random_bookings()
    print("INSERTED RANDOM BOOKINGS")
except Exception:
    print("Couldn't enter mock bookings")

try:
    Populate_db.update_calendar_weeks()
    print("UPDATE CALENDAR WEEKS")
except Exception as e:
    print(e)

try:
    Populate_db.create_admin_db(get_user_data())
    print("CREATED ADMIN DB")
except Exception as e:
    print(e)

if __name__ == "__main__":
    port_80 = int(os.environ.get("PORT", 80))
    # port_5k = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port_80)
