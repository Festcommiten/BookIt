from handlers.populate_mock_db import PopulateDb
from handlers import CONSTANTS as C
from handlers import mongo_client

mongo_collections = mongo_client.initiate_mongo_client("db")
mock_collection = mongo_collections[0]
users_collection = mongo_collections[1]
db = PopulateDb(mock_collection, users_collection)


def test_get_week_int():
    assert db.get_week_int(2021, 6, 7) == 23
    assert db.get_week_int(2021, 6, 7) != 21


def test_convert_int_to_string_of_minimum_length_two():
    assert db.convert_int_to_string_of_minimum_length_two(1) == "01"
    assert db.convert_int_to_string_of_minimum_length_two(1) != "1"
    assert db.convert_int_to_string_of_minimum_length_two(11) == "11"
    assert db.convert_int_to_string_of_minimum_length_two(111) == "111"


def test_room_name_exist():
    assert db.room_name_exist(C.ROOM_NAMES_LIST[0]) is True
    assert db.room_name_exist("Kakashi") is True
    assert db.room_name_exist("Leo") is False


def test_day_of_time_slot():
    assert db.day_of_time_slot(1) == 1
    assert db.day_of_time_slot(35) == 4
    assert db.day_of_time_slot(23) != 1


def test_date_of_day():
    assert db.date_of_day(23, 1) == [2021, 6, 7]
    assert db.date_of_day(23, 1) != [2022, 5, 8]


def test_get_starting_hour():
    assert db.get_starting_hour(9) == 16
    assert db.get_starting_hour(6) == 13
    assert db.get_starting_hour(4) != 16
    assert db.get_starting_hour(0) == 16


def test_get_current_time_slot_value():
    assert db.get_current_time_slot_value(23, 1, 1) != []
    assert db.get_current_time_slot_value(23, 1, 1) != ["2021-06-07T08:00:00+02:00",
                                                        "2021-06-07T09:00:00+02:00",
                                                        "202106070801"]


def test_generate_empty_documents_for_room_time_slots_based_on_week():
    assert db.generate_empty_documents_for_room_time_slots_based_on_week("Ada", 23, 1) != []


def test_populate_time_slots_for_all_weeks():
    assert db.populate_time_slots_for_all_weeks() != []


def test_combine_lists():
    assert db.combine_lists([["Hello"], ["World!"]]) == ["Hello", "World!"]
    assert db.combine_lists([["Hello"], ["World!"]]) != []


def test_get_random_starting_times():
    assert len(db.get_random_starting_times()) == 150
    assert type(db.get_random_starting_times()) == list
    assert db.get_random_starting_times() != []


def test_convert_time_to_id():
    assert db.convert_time_to_id("2021-06-07T08:00:00+02:00", C.ROOM_NAMES_LIST.index("Ada")) == 202106070801
    assert db.convert_time_to_id("2021-10-20T08:00:00+02:00", C.ROOM_NAMES_LIST.index("Kakashi")) == 202110200805


def test_populate_time_slots():
    assert db.populate_time_slots(23, 1) != []
