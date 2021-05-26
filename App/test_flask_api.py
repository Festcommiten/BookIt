import requests
from handlers import api_tools as tools
from pymongo import MongoClient

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock_data"]

# CONSTANTS
url = "http://127.0.0.1:5000"
new_booking_correct_data_and_order = {
    "_id": 1,
    "room": "ada",
    "week": 20,
    "booking_company": "Company1",
    "booker": "oscar",
    "start_time": "2021-05-21:09:00:00",
    "end_time": "2021-05-21:10:00:00"
}
new_booking_correct_data_wrong_order = {
    "_id": 1,
    "week": 20,
    "room": "ada",
    "booking_company": "Company1",
    "booker": "oscar",
    "start_time": "2021-05-21:09:00:00",
    "end_time": "2021-05-21:10:00:00"
}
new_booking_incorrect_data = {
    "_id": 1,
    "room": "ada",
    "week": 20,
    "booking_company": "Company1",
    "user": "oscar",
    "start_time": "2021-05-21:09:00:00",
    "end_time": "2021-05-21:10:00:00"
}


def test_new_booking():
    url_endpoint = url + "/v1/new_booking"
    response = requests.post(url_endpoint, json=new_booking_correct_data_and_order).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    response = requests.post(url_endpoint, json=new_booking_correct_data_wrong_order).json()
    assert response["message"] == tools.REQUEST_KEYS_ORDERED_FALSE
    assert response["status"] == 400

    response = requests.post(url_endpoint, json=new_booking_incorrect_data).json()
    assert response["message"] == tools.REQUEST_KEYS_FALSE
    assert response["status"] == 400
