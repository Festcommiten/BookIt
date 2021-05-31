import requests
from handlers import CONSTANTS as C
from pymongo import MongoClient
from handlers import flask_api as api

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock_data"]

# CONSTANTS.py
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
    response = requests.put(url_endpoint, json=C.NB_CORRECT_DATA).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    response = requests.put(url_endpoint, json=C.NB_INCORRECT_ID).json()
    assert response["message"] == C.ID_DOES_NOT_EXIST
    assert response["status"] == 400

    response = requests.put(url_endpoint, json=C.NB_WRONG_DATATYPE).json()
    assert response["message"] == "'" + C.WRONG_ID_DATATYPE + "' " + C.STR_TO_INT_ERROR
    assert response["status"] == 400


def test_remove_booking():
    endpoint = url + "/v1/remove/"
    endpoint_correct_data = endpoint + C.EXISTING_ID_AS_STR
    endpoint_incorrect_data = endpoint + C.WRONG_ID_DATATYPE
    endpoint_no_existing_id = endpoint + C.NONE_EXISTING_ID

    response = requests.put(endpoint_correct_data).json()
    assert response["message"] == C.SLOT_IS_EMPTY
    assert response["status"] == 200

    response = requests.put(endpoint_incorrect_data).json()
    assert response["message"] == "'" + C.WRONG_ID_DATATYPE + "' " + C.STR_TO_INT_ERROR
    assert response["status"] == 400

    response = requests.put(endpoint_no_existing_id).json()
    assert response["message"] == C.ID_DOES_NOT_EXIST
    assert response["status"] == 400


def test_db_find_one():
    assert api.db_find_one("_id", 202105191601) == C.EXISTING_DATA
    assert api.db_find_one("_id", 1234) is None


def test_get_users():
    endpoint = url + "/v1/users"
    response = requests.get(endpoint)
    assert response["message"] == "OK"
    assert response["status"] == 200
