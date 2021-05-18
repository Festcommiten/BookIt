# import requests
from multiprocessing import Process
from flask import Flask

# from <API location> import <API>

app = Flask(__name__)
# <API>(app)
flask_app = Process(target=app.run)
url = "http://127.0.0.1:5000"


def setup_module(module):
    flask_app.start()


def teardown_module(module):
    flask_app.terminate()
    flask_app.join()


# WRITE UNIT TESTS BELOW THIS LINE
def test_new_booking():
    # This unit test will be implemented when Mongo test environment has been setup for pytest
    """
    url_endpoint = url + "/v1/new_booking"
    new_booking_correct_data_and_order = {
        "room": "ada",
        "week": 20,
        "booking-company": "Company1",
        "booker": "oscar",
        "start_time": "2021-05-21:09:00:00",
        "end_time": "2021-05-21:10:00:00"
    }
    response = requests.post(url_endpoint, json=new_booking_correct_data_and_order).json()
    assert = response["message"] == "OK"
    assert response["status"] == 200

    new_booking_correct_data_wrong_order = {
        "week": 20,
        "room": "ada",
        "booking-company": "Company1",
        "booker": "oscar",
        "start_time": "2021-05-21:09:00:00",
        "end_time": "2021-05-21:10:00:00"
    }
    response = requests.post(url_endpoint, json=new_booking_correct_data_wrong_order).json()
    assert = response["message"] == api_tools.REQUEST_KEYS_ORDERED_FALSE
    assert response["status"] == 400

    new_booking_incorrect_data = {
        "room": "ada",
        "week": 20,
        "booking-company": "Company1",
        "user": "oscar",
        "start_time": "2021-05-21:09:00:00",
        "end_time": "2021-05-21:10:00:00"
    }
    response = requests.post(url_endpoint, json=new_booking_incorrect_data).json()
    assert = response["message"] == api_tools.REQUEST_KEYS_FALSE
    assert response["status"] == 400
    """
