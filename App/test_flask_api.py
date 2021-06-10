import requests
from multiprocessing import Process
from flask import Flask
from handlers import CONSTANTS as C
from handlers import flask_api as api
from handlers import mongo_client
from handlers.populate_mock_db import PopulateDb
from handlers.get_workplace_info import get_user_data


mongo_collections = mongo_client.initiate_mongo_client("db")
mock_collection = mongo_collections[0]
users_collection = mongo_collections[1]

app = Flask(__name__)
api.bookit_api(app, mock_collection, users_collection)
flask_app = Process(target=app.run)


def setup_module(module):
    flask_app.start()

    populate_db = PopulateDb(mock_collection, users_collection)

    try:
        populate_db.insert_empty_time_slots()
        print("INSERTED EMPTY TIME SLOTS")
    except Exception:
        print("Empty time slots are already added!")

    try:
        populate_db.insert_random_bookings()
        print("INSERTED RANDOM BOOKINGS")
    except Exception:
        print("Couldn't enter mock bookings")

    try:
        populate_db.update_calendar_weeks()
        print("UPDATE CALENDAR WEEKS")
    except Exception as e:
        print(e)

    try:
        populate_db.create_admin_db(get_user_data())
        print("CREATED ADMIN DB")
    except Exception as e:
        print(e)


def teardown_module(module):
    flask_app.terminate()
    flask_app.join()


def test_hello_world():
    endpoint = C.HTTP + C.LOCAL_HOST + C.PORT_5K + "/"
    print("ENDPOINT:", endpoint)
    response = requests.get(endpoint)
    assert response.content == b"Hello World!"
    assert response.status_code == 200


def test_new_booking():
    endpoint = C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION + "/new_booking/"
    endpoint_correct = endpoint + C.EXISTING_ID_AS_STR
    response = requests.put(endpoint_correct, json=C.NEW_BOOKING_DATA).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    endpoint_incorrect = endpoint + C.NONE_EXISTING_ID
    response = requests.put(endpoint_incorrect, json=C.NEW_BOOKING_DATA).json()
    assert response["message"] == C.ID_DOES_NOT_EXIST
    assert response["status"] == 400

    endpoint_wrong_datatype = endpoint + C.WRONG_ID_DATATYPE
    response = requests.put(endpoint_wrong_datatype, json=C.NEW_BOOKING_DATA)
    assert response.status_code == 404


def test_remove_booking():
    endpoint = C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION + "/remove/"
    endpoint_correct_data = endpoint + C.EXISTING_ID_AS_STR
    response = requests.put(endpoint_correct_data).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    endpoint_incorrect_data = endpoint + C.WRONG_ID_DATATYPE
    response = requests.put(endpoint_incorrect_data)
    assert response.status_code == 404

    endpoint_no_existing_id = endpoint + C.NONE_EXISTING_ID
    response = requests.put(endpoint_no_existing_id).json()
    assert response["message"] == C.ID_DOES_NOT_EXIST
    assert response["status"] == 400


# def test_db_find_one():
    # assert api.db_find_one("_id", C.EXISTING_ID_AS_INT) == C.EXISTING_DATA
    # assert api.db_find_one("_id", 1234) is None


def test_get_users():
    endpoint_correct = C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION + "/users"
    response = requests.get(endpoint_correct).json()
    assert response["message"] == "OK"
    assert response["status"] == 200


def test_get_rooms():
    endpoint_correct = C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION + "/rooms"
    response = requests.get(endpoint_correct).json()
    assert sorted(response["rooms"]) == sorted(C.ROOM_NAMES_LIST)
    assert response["message"] == "OK"
    assert response["status"] == 200


def test_bookings():
    endpoint_correct = C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION + "/bookings"
    response = requests.get(endpoint_correct).json()
    assert response["message"] == "OK"
    assert response["status"] == 200


def test_bookings_week():
    endpoint = C.HTTP + C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION
    endpoint_correct = endpoint + "/bookings/23"
    response = requests.get(endpoint_correct).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    endpoint_incorrect = endpoint + "/bookings/123"
    response = requests.get(endpoint_incorrect).json()
    assert response["bookings"] == C.NO_BOOKINGS_PARAMETERS
    assert response["message"] == "Bad request"
    assert response["status"] == 400

    endpoint_wrong_datatype = endpoint + "/bookings/a"
    response = requests.put(endpoint_wrong_datatype)
    assert response.status_code == 404


def test_bookings_week_room():
    endpoint = C.HTTP + C.HTTP + C.LOCAL_HOST + C.PORT_5K + C.CURRENT_VERSION
    endpoint_correct = endpoint + "/bookings/23/Ada"
    print("ENDPOINT CORRECT:", endpoint_correct)
    response = requests.get(endpoint_correct).json()
    assert response["message"] == "OK"
    assert response["status"] == 200

    endpoint_incorrect = endpoint + "/bookings/1/room_1"
    print("ENDPOINT_INCORRECT:", endpoint_incorrect)
    response = requests.get(endpoint_incorrect).json()
    assert response["bookings"] == C.NO_BOOKINGS_PARAMETERS
    assert response["message"] == "Bad request"
    assert response["status"] == 400

    endpoint_wrong_datatype = endpoint + "/bookings/a/Ada"
    print("ENDPOINT WRONG DATATYPE:", endpoint_wrong_datatype)
    response = requests.put(endpoint_wrong_datatype)
    assert response.status_code == 404
