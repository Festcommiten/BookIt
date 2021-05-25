from pymongo import MongoClient
import datetime
import random

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

NUMBER_OF_WEEKS = 5
TIME_SLOTS_FOR_ROOM_PER_WEEK = 45

ROOM_NAMES_LIST = ["Ada", "Rust", "Douglas", "Katniss", "Kakashi", "Obito"]

bookers = \
    [
        "Leo på Backend",
        "Lars på Frontend",
        "Niklas på Operations",
        "Oscar på Backend",
        "Michaela på Deepend"
    ]
booking_companies = \
    [
        "Codic Education",
        "Codic Consulting",
        "GoMoGroup",
        "MeAnalytics",
        "FutureSkill",
        "SoftwareSkills",
        "Flexpool"
    ]


def updated_week_list():
    this_week = current_week_int
    last_week = this_week - 1
    next_week = this_week + 1
    current_week_list = [last_week, this_week, next_week, next_week + 1, next_week + 2, next_week + 3]
    return current_week_list


weeks = updated_week_list()


def convert_int_to_string_of_minimum_length_two(int_input):
    if type(int_input) is int:
        str_input = str(int_input)
        if len(str_input) == 1:
            return "0" + str_input
        else:
            return str_input


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


def get_current_time_slot_value(week: int, time_slot_number: int, room_order):
    day_in_week = day_of_time_slot(time_slot_number)
    date = date_of_day(week, day_in_week)
    year = convert_int_to_string_of_minimum_length_two(date[0])
    month = convert_int_to_string_of_minimum_length_two(date[1])
    day = convert_int_to_string_of_minimum_length_two(date[2])
    hour_int = get_starting_hour(time_slot_number)
    hour = convert_int_to_string_of_minimum_length_two(hour_int)
    hour_plus_one = convert_int_to_string_of_minimum_length_two(hour_int + 1)
    minute = "00"
    room_id = convert_int_to_string_of_minimum_length_two(room_order + 1)

    starting_time = f"{year}-{month}-{day}T{hour}:{minute}:00+02:00"
    end_time = f"{year}-{month}-{day}T{hour_plus_one}:{minute}:00+02:00"
    time_based_id = f"{year}{month}{day}{hour}{room_id}"
    returnArray = [starting_time, end_time, time_based_id]
    return returnArray


def generate_empty_documents_for_room_time_slots_based_on_week(room_name: str, week: int, room_order: int):
    room_data_for_week = []
    if room_name_exist(room_name):
        for i in range(TIME_SLOTS_FOR_ROOM_PER_WEEK):
            slot = i + 1
            time_slot_data = get_current_time_slot_value(week, slot, room_order)
            room_empty_time_slot_data = {
                "_id": int(time_slot_data[2]),
                "room": room_name,
                "week": week,
                "booking_company": "",
                "booker": "",
                "starting_time": time_slot_data[0],
                "end_time": time_slot_data[1]
            }
            starting_times.append(room_empty_time_slot_data["starting_time"])
            room_data_for_week.append(room_empty_time_slot_data)
            # counter_for_id += 1
    return room_data_for_week


def populate_time_slots():
    populated_times_slots = []
    for room_order in range(len(ROOM_NAMES_LIST)):
        room_name = ROOM_NAMES_LIST[room_order]
        for week in weeks:
            rooms_data_for_week = generate_empty_documents_for_room_time_slots_based_on_week(room_name, week,
                                                                                             room_order)
            populated_times_slots.append(rooms_data_for_week)
    return populated_times_slots


def combine_lists(array_of_lists):
    combined_list = []
    for list in array_of_lists:
        for object in list:
            combined_list.append(object)
    return combined_list


def print_x_random_times():
    x = 72
    times_to_be_shown = get_random_starting_times()
    for i in range(len(ROOM_NAMES_LIST)):
        for j in range(x):
            id_int = convert_time_to_id(times_to_be_shown[j], i)
            print(collection.find_one({"_id": id_int}))


def get_random_starting_times():
    return random.sample(starting_times, 150)


def convert_time_to_id(time, room_id):
    year = time[0:4]
    month = time[5:7]
    day = time[8:10]
    hour = time[11:13]
    room_id = convert_int_to_string_of_minimum_length_two(room_id + 1)
    id_to_update = int(year + month + day + hour + room_id)
    return id_to_update


def generate_bookings():
    times_to_be_booked = get_random_starting_times()
    for i in range(len(ROOM_NAMES_LIST)):
        for time in range(len(times_to_be_booked)):
            id_to_update = convert_time_to_id(times_to_be_booked[time], i)
            booker = random.choice(bookers)
            booking_company = random.choice(booking_companies)
            collection.update_one({"_id": id_to_update},
                                  {"$set": {"booker": booker, "booking_company": booking_company}})


# print(combine_lists(populate_time_slots()))
print("Inserting empty time slot data")
collection.insert_many(combine_lists(populate_time_slots()))
print("Updating 150 * 6 documents with booker, and booking data")
generate_bookings()
print("These are all randomized mock bookings: ")
print(collection.find({"booker": {"$exists": "true", "$ne": ""}}))
print("This is printing the first document of each week for each room, should be 72 documents")
print_x_random_times()


"""
days = datetime.timedelta(days=1)

d = datetime.timedelta(days=2)
a = time_now + d


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
"""
