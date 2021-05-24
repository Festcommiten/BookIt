from pymongo import MongoClient
import datetime

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
collection = db["mock_data"]

my_date = datetime.date.today()
time_now = datetime.datetime.today()
current_year_int, current_week_int, current_day_of_week_int = my_date.isocalendar()
current_month_int = time_now.month
current_day_int = time_now.day
current_hour_int = time_now.hour

starting_times = []
weeks = [20, 21, 22, 23, 24, 25]

NUMBER_OF_WEEKS = 5
TIME_SLOTS_FOR_ROOM_PER_WEEK = 45


ROOM_NAMES_LIST = ["Ada", "Rust", "Douglas", "Katniss", "Kakashi", "Obito"]


def type_is_int(input):
    if type(input) == int:
        return True
    else:
        return False


def check_if_type_is_str(input):
    if type(input) == str:
        return True
    else:
        return False


def convert_int_to_string_of_minimum_length_two(int_input):
    if type_is_int(int_input):
        str_input = str(int_input)
        if len(str_input) == 1:
            return "0" + str_input
        else:
            return str_input


def get_starting_id(all_int_id_entries):
    if all_int_id_entries:
        last_json_entry = all_int_id_entries[:1]
        entry_id = last_json_entry["_id"]
        if type_is_int(entry_id):
            return entry_id
        else:
            return 0  # Case when id in db is of objectID type
    else:
        return 0  # Case when no entries exist in db


def latest_int_id_entry_in_db():
    try:
        latest_int_id_entry = collection.find().sort({"_id": -1}).limit(1)["_id"]
        print(type(latest_int_id_entry))
        print(latest_int_id_entry)
    except:
        latest_int_id_entry = False

    if latest_int_id_entry:
        return latest_int_id_entry
    else:
        return False


def room_name_exist(room_name):
    if room_name in ROOM_NAMES_LIST:
        return True
    else:
        return False


def day_of_time_slot(slot_number):
    if slot_number <= 9:
        return 1
    elif 10 <= slot_number <= 18:
        return 2
    elif 19 <= slot_number <= 27:
        return 3
    elif 28 <= slot_number <= 36:
        return 4
    elif 37 <= slot_number <= 45:
        return 5


def date_of_day(week: int, day: int):
    time_object = datetime.date.fromisocalendar(current_year_int, week, day)
    return_list = [time_object.year, time_object.month, time_object.day]

    return return_list


def get_starting_hour(time_slot_number):
    slot_hour = time_slot_number % 9
    if slot_hour == 1:
        return 8
    elif slot_hour == 2:
        return 9
    elif slot_hour == 3:
        return 10
    elif slot_hour == 4:
        return 11
    elif slot_hour == 5:
        return 12
    elif slot_hour == 6:
        return 13
    elif slot_hour == 7:
        return 14
    elif slot_hour == 8:
        return 15
    else:
        return 16


def get_current_time_slot_value(week: int, time_slot_number: int):
    day_in_week = day_of_time_slot(time_slot_number)
    date = date_of_day(week, day_in_week)
    year = convert_int_to_string_of_minimum_length_two(date[0])
    month = convert_int_to_string_of_minimum_length_two(date[1])
    day = convert_int_to_string_of_minimum_length_two(date[2])
    hour_int = get_starting_hour(time_slot_number)
    hour = convert_int_to_string_of_minimum_length_two(hour_int)
    minute = "00"

    starting_time = f"{year}-{month}-{day}T{hour}:{minute}:00+02:00"
    end_time = f"{year}-{month}-{day}T{convert_int_to_string_of_minimum_length_two(hour_int+1)}:{minute}:00+02:00"
    returnArray = [starting_time, end_time]
    return returnArray



def generate_empty_documents_for_room_time_slots_based_on_week(room_name: str, week: int):
    room_data_for_week = []
    counter_for_id = latest_int_id_entry_in_db() + 1
    if not type_is_int(counter_for_id):
        counter_for_id = 1
    if room_name_exist(room_name):
        for i in range(TIME_SLOTS_FOR_ROOM_PER_WEEK):
            room_empty_time_slot_data = {
                "_id": counter_for_id,
                "room": room_name,
                "week": week,
                "booking_company": "",
                "booker": "",
                "starting_time": get_current_time_slot_value(week, i)[0],
                "end_time": get_current_time_slot_value(week, i)[1]
            }
            room_data_for_week.append(room_empty_time_slot_data)
            counter_for_id += 1
    return room_data_for_week


collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[0]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[1]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[2]))
"""
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[3]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[4]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[0], weeks[5]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[0]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[1]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[2]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[3]))
collection.insert(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[4]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[1], weeks[5]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[0]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[1]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[2]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[3]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[4]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[2], weeks[5]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[0]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[1]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[2]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[3]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[4]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[3], weeks[5]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[0]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[1]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[2]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[3]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[4]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[4], weeks[5]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[0]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[1]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[2]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[3]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[4]))
collection.insert_many(generate_empty_documents_for_room_time_slots_based_on_week(ROOM_NAMES_LIST[5], weeks[5]))
"""

"""
days = datetime.timedelta(days=1)

d = datetime.timedelta(days=2)
a = time_now + d
"""