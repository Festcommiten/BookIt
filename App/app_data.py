import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from helpers.populate_mock_db import insert_empty_time_slots, insert_random_bookings, update_calendar_weeks
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

current_version = '/v1.0'

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
collection = db["mock_data"]

try:
    insert_empty_time_slots()
except Exception:
    print("Empty time slots are already added!")

try:
    insert_random_bookings()
except Exception:
    print("Couldnt enter mock bookings")

try:
    update_calendar_weeks()
except Exception as e:
    print(e)

@app.route(current_version + '/')
@cross_origin()
def alive():
    return "Hello World!"


@app.route(current_version + '/bookings/<int:week>/<string:room_name>', methods=['GET'])
@cross_origin()
def get_bookings_for_room_and_week(week, room_name):
    retArray = []
    cursor = collection.find({"$and": [{"week": week}, {"room": room_name}]})
    for doc in cursor:
        retArray.append(doc)
    return jsonify(retArray)


@app.route(current_version + '/remove/<int:id>', methods=['PUT'])
@cross_origin()
def remove_booking(id):
    collection.update({"_id": id}, {"$set": {"company": "", "booker": ""}})
    return "Time slot now empty"


@app.route(current_version + '/new_booking/<int:id>', methods=['PUT'])
@cross_origin()
def new_booking(id):
    booking_info = request.json
    company = booking_info["company"]
    booker = booking_info["booker"]
    collection.update({"_id": id}, {"$set": {"company": company, "booker": booker}})
    return "Time slot booked"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 80))
    app.run(debug=True, host='0.0.0.0', port=port)