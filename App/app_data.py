import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from helpers.populate_mock_db import insert_empty_time_slots, insert_random_bookings
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
collection = db["mock_data"]

try:
    insert_empty_time_slots()
except Exception:
    print("Mock data already exists.")

try:
    insert_random_bookings()
except Exception:
    print("Mock data already exists.")


@app.route('/')
@cross_origin()
def alive():
    return "Hello World!"


@app.route('/bookings/<int:week>/<string:room_name>', methods=['GET'])
@cross_origin()
def get_bookings_for_room_and_week(week, room_name):
    retArray = []
    cursor = collection.find({"$and": [{"week": week}, {"room": room_name}]})
    for doc in cursor:
        retArray.append(doc)
    return jsonify(retArray)


@app.route('/delete/<int:id>', methods=['PUT'])
@cross_origin()
def delete_booking(id):
    collection.update({"_id": id}, {"$set": {"booking_company": "", "booker": ""}})
    return "Time slot now empty"


@app.route('/new_booking/<int:id>', methods=['PUT'])
@cross_origin()
def new_booking(id):
    booking_info = request.json
    company = booking_info["booking_company"]
    booker = booking_info["booker"]
    collection.update({"_id": id}, {"$set": {"booking_company": company, "booker": booker}})
    return "Time slot booked"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 80))
    app.run(debug=True, host='0.0.0.0', port=port)
