from flask import Flask
from handlers.flask_api import bookit_api
from handlers.populate_mock_db import insert_empty_time_slots, insert_random_bookings, update_calendar_weeks, create_admin_db
from handlers.get_workplace_info import get_user_data
from flask_cors import CORS
import os

app = Flask(__name__)
bookit_api(app)
CORS(app)

try:
    insert_empty_time_slots()
    print("INSERTED EMPTY TIME SLOTS")
except Exception:
    print("Empty time slots are already added!")

try:
    insert_random_bookings()
    print("INSERTED RANDOM BOOKINGS")
except Exception:
    print("Couldn't enter mock bookings")

try:
    update_calendar_weeks()
    print("UPDATE CALENDAR WEEKS")
except Exception as e:
    print(e)

try:
    user_data = [tools.convert_users_structure(get_user_data())]
    create_admin_db(user_data)
    print("CREATED ADMIN DB")
except Exception as e:
    print(e)

if __name__ == "__main__":
    port_80 = int(os.environ.get("PORT", 80))
    port_5k = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port_80)
