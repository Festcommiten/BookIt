# ***** VARIABLES *****
# URL
HTTP = "http://"
LOCAL_HOST = "127.0.0.1"
DEFAULT_ROUTE = "0.0.0.0"
PORT_5K = ":5000"
PORT_80 = ":80"
CURRENT_VERSION = "/v1.0"

# ID
EXISTING_ID_AS_STR = "202106070801"
EXISTING_ID_AS_INT = 202106070801
NONE_EXISTING_ID = "110100100"
WRONG_ID_DATATYPE = "a"

# ENDPOINT NAMES
NEW_BOOKING = "new_booking"
# EXPECTED REQUEST
API_REQUEST_KEYS = {
    NEW_BOOKING: [
        "_id",
        "room",
        "week",
        "booking_company",
        "booker",
        "start_time",
        "end_time"
    ]
}

# ***** MESSAGES *****
SLOT_IS_EMPTY = "Time slot is now empty"

# ERROR MESSAGES
REQUEST_KEYS_FALSE = "One or more json keys are incorrect"
REQUEST_KEYS_ORDERED_FALSE = "The jsons key order is incorrect"
ID_DOES_NOT_EXIST = "This id does not exist"
STR_TO_INT_ERROR = "can't be convert to a integer"
NO_BOOKINGS_PARAMETERS = "There are no bookings with the given parameters"

# ***** DATA *****
EXISTING_DATA = {
    "_id": 202106070801,
    "booker": "",
    "company": "",
    "end_time": "2021-06-07T09:00:00+02:00",
    "room": "Ada",
    "starting_time": "2021-06-07T08:00:00+02:00",
    "week": 23
}
# NEW_BOOKING
NEW_BOOKING_DATA = {
  "company": "CE",
  "booker": "Robin "
}

ROOM_NAMES_LIST = ["Ada", "Rust", "Douglas", "Katniss", "Kakashi", "Obito"]
