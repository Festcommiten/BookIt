from handlers import api_tools as tools

# CONSTANTS
new_booking_correct_keys_ordered = {
    "_id": "",
    "room": "",
    "week": "",
    "booking_company": "",
    "booker": "",
    "start_time": "",
    "end_time": ""
}
new_booking_correct_keys_unordered = {
    "_id": "",
    "room": "",
    "booker": "",
    "week": "",
    "start_time": "",
    "booking_company": "",
    "end_time": ""
}
new_booking_incorrect_keys = {
    "_id": "",
    "room": "",
    "week": "",
    "booking_company": "",
    "user": "",
    "start_time": "",
    "end_time": ""
}


def test_validate_request_keys_unordered():
    # Tests the function with mock data found under 'CONSTANTS'
    # new_booking_correct_keys_ordered: The data is correct and should work
    # new_booking_correct_keys_unordered: The data is correct but its is
    # structured wrong. Should still work
    # new_booking_incorrect_keys: Incorrect data and should not work
    assert tools.validate_request_keys_unordered(
        new_booking_correct_keys_ordered, tools.NEW_BOOKING) is True
    assert tools.validate_request_keys_unordered(
        new_booking_correct_keys_unordered, tools.NEW_BOOKING) is True
    assert tools.validate_request_keys_unordered(
        new_booking_incorrect_keys, tools.NEW_BOOKING) is False


def test_validate_request_keys_ordered():
    # Tests the function with mock data found under 'CONSTANTS'
    # new_booking_correct_keys_ordered: The data is correct and should work
    # new_booking_correct_keys_unordered: The data is correct but its is
    # structured wrong. Should not work
    # new_booking_incorrect_keys: Incorrect data and should not work
    assert tools.validate_request_keys_ordered(
        new_booking_correct_keys_ordered, tools.NEW_BOOKING) is True
    assert tools.validate_request_keys_ordered(
        new_booking_correct_keys_unordered, tools.NEW_BOOKING) is False
    assert tools.validate_request_keys_ordered(
        new_booking_incorrect_keys, tools.NEW_BOOKING) is False
