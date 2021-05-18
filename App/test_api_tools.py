from handlers import api_tools

# CONSTANTS
new_booking_correct_keys_ordered = {
    "room": "",
    "week": "",
    "booking-company": "",
    "booker": "",
    "start_time": "",
    "end_time": ""
}
new_booking_correct_keys_unordered = {
    "room": "",
    "booker": "",
    "week": "",
    "start_time": "",
    "booking-company": "",
    "end_time": ""
}
new_booking_incorrect_keys = {
    "room": "",
    "week": "",
    "booking-company": "",
    "user": "",
    "start_time": "",
    "end_time": ""
}

def test_validate_request_keys():
    assert api_tools.validate_request_keys_unordered(new_booking_correct_keys_ordered, api_tools.NEW_BOOKING) == True
    assert api_tools.validate_request_keys_unordered(new_booking_correct_keys_unordered, api_tools.NEW_BOOKING) == True
    assert api_tools.validate_request_keys_unordered(new_booking_incorrect_keys, api_tools.NEW_BOOKING) == False


def test_validate_request_keys_ordered():
    assert api_tools.validate_request_keys_ordered(new_booking_correct_keys_ordered, api_tools.NEW_BOOKING) == True
    assert api_tools.validate_request_keys_ordered(new_booking_correct_keys_unordered, api_tools.NEW_BOOKING) == False
    assert api_tools.validate_request_keys_ordered(new_booking_incorrect_keys, api_tools.NEW_BOOKING) == False
