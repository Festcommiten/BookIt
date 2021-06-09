from pymongo import MongoClient
import handlers.CONSTANTS as C
import datetime
import random
"""
# MONGO
client = MongoClient("mongodb://localhost:27017")
db = client.test_db
collection = db["mock_data"]
users_collection = db["users"]
"""


class PopulateDb:
    def __init__(self, collection, users_collection):
        self.collection = collection
        self.users_collection = users_collection

        self.my_date = datetime.date.today()
        self.time_now = datetime.datetime.today()
        self.current_year_int, self.current_week_int, self.current_day_of_week_int = self.my_date.isocalendar()
        self.current_month_int = self.time_now.month
        self.current_day_int = self.time_now.day
        self.current_hour_int = self.time_now.hour

        self.today = datetime.datetime.now()

        self.week_dates = [
            self.today + datetime.timedelta(days=-7),
            self.today,
            self.today + datetime.timedelta(days=7),
            self.today + datetime.timedelta(days=14),
            self.today + datetime.timedelta(days=21),
            self.today + datetime.timedelta(days=28)
        ]

        self.starting_times = []

        self.TIME_SLOTS_FOR_ROOM_PER_WEEK = 45

        self.bookers = \
            [
                "Leo på Backend",
                "Lars på Frontend",
                "Niklas på Operations",
                "Oscar på Backend",
                "Michaela på Projektledning"
            ]
        self.booking_companies = \
            [
                "Codic Education",
                "Codic Consulting",
                "GoMoGroup",
                "MeAnalytics",
                "FutureSkill",
                "SoftwareSkills",
                "Flexpool"
            ]
        self.weeks = self.updated_week_list()

    def get_week_int(self, year, month, day):
        return datetime.date(year, month, day).isocalendar()[1]

    def updated_week_list(self):
        current_week_list = []
        for date in self.week_dates:
            year = date.year
            month = date.month
            day = date.day
            current_week_list.append(self.get_week_int(year, month, day))
        return current_week_list

    def convert_int_to_string_of_minimum_length_two(self, input):
        if type(input) is int:
            string = str(input)
            if len(string) == 1:
                return "0" + string
            else:
                return string

    def room_name_exist(self, room_name):
        if room_name in C.ROOM_NAMES_LIST:
            return True
        else:
            return False

    def day_of_time_slot(self, slot_number):
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

    def date_of_day(self, week: int, day: int):
        time_object = datetime.date.fromisocalendar(self.current_year_int, week, day)
        return_list = [time_object.year, time_object.month, time_object.day]

        return return_list

    def get_starting_hour(self, time_slot_number):
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

    def get_current_time_slot_value(self, week: int, time_slot_number: int, room_order):
        day_in_week = self.day_of_time_slot(time_slot_number)
        date = self.date_of_day(week, day_in_week)
        year = self.convert_int_to_string_of_minimum_length_two(date[0])
        month = self.convert_int_to_string_of_minimum_length_two(date[1])
        day = self.convert_int_to_string_of_minimum_length_two(date[2])
        hour_int = self.get_starting_hour(time_slot_number)
        hour = self.convert_int_to_string_of_minimum_length_two(hour_int)
        hour_plus_one = self.convert_int_to_string_of_minimum_length_two(hour_int + 1)
        minute = "00"
        room_id = self.convert_int_to_string_of_minimum_length_two(room_order + 1)

        starting_time = f"{year}-{month}-{day}T{hour}:{minute}:00+02:00"
        end_time = f"{year}-{month}-{day}T{hour_plus_one}:{minute}:00+02:00"
        time_based_id = f"{year}{month}{day}{hour}{room_id}"
        returnArray = [starting_time, end_time, time_based_id]
        return returnArray

    def generate_empty_documents_for_room_time_slots_based_on_week(self, room_name: str, week: int, room_order: int):
        room_data_for_week = []
        if self.room_name_exist(room_name):
            for i in range(self.TIME_SLOTS_FOR_ROOM_PER_WEEK):
                slot = i + 1
                time_slot_data = self.get_current_time_slot_value(week, slot, room_order)
                room_empty_time_slot_data = {
                    "_id": int(time_slot_data[2]),
                    "room": room_name,
                    "week": week,
                    "company": "",
                    "booker": "",
                    "starting_time": time_slot_data[0],
                    "end_time": time_slot_data[1]
                }
                self.starting_times.append(room_empty_time_slot_data["starting_time"])
                room_data_for_week.append(room_empty_time_slot_data)
        return room_data_for_week

    def populate_time_slots_for_all_weeks(self):
        populated_times_slots = []
        for room_order in range(len(C.ROOM_NAMES_LIST)):
            room_name = C.ROOM_NAMES_LIST[room_order]
            for week in self.weeks:
                rooms_data_for_week = self.generate_empty_documents_for_room_time_slots_based_on_week(room_name, week,
                                                                                                 room_order)
                populated_times_slots.append(rooms_data_for_week)
        return populated_times_slots

    def combine_lists(self, array_of_lists):
        combined_list = []
        for list in array_of_lists:
            for object in list:
                combined_list.append(object)
        return combined_list

    def print_x_random_times(self):
        x = 12
        times_to_be_shown = self.get_random_starting_times()
        for i in range(len(C.ROOM_NAMES_LIST)):
            for j in range(x):
                id_int = self.convert_time_to_id(times_to_be_shown[j], i)
                print(self.collection.find_one({"_id": id_int}))

    def get_random_starting_times(self):
        return random.sample(self.starting_times, 150)

    def convert_time_to_id(self, time, room_id):
        year = time[0:4]
        month = time[5:7]
        day = time[8:10]
        hour = time[11:13]
        room_id = self.convert_int_to_string_of_minimum_length_two(room_id + 1)
        converted_id = int(year + month + day + hour + room_id)
        return converted_id

    def insert_random_bookings(self):
        if not self.collection.find_one({"company": "FutureSkill"}):
            times_to_be_booked = self.get_random_starting_times()
            for i in range(len(C.ROOM_NAMES_LIST)):
                for time in range(len(times_to_be_booked)):
                    id_to_update = self.convert_time_to_id(times_to_be_booked[time], i)
                    booker = random.choice(self.bookers)
                    booking_company = random.choice(self.booking_companies)
                    self.collection.update_one({"_id": id_to_update},
                                          {"$set": {"booker": booker, "company": booking_company}})
            print("Random bookings created")
        else:
            print("No new bookings entered")

    def insert_empty_time_slots(self):
        self.collection.insert_many(self.combine_lists(self.populate_time_slots_for_all_weeks()))
        print("1620 empty documents inserted")

    def populate_time_slots(self, week, room_order):
        room_name = C.ROOM_NAMES_LIST[room_order]
        populated_times_slots = self.generate_empty_documents_for_room_time_slots_based_on_week(room_name, week,
                                                                                           room_order)
        return populated_times_slots

    def add_new_week_to_all_rooms(self):
        new_week = self.weeks[-1]
        populated_times_slots = []
        for room_order in range(len(C.ROOM_NAMES_LIST)):
            populated_times_slots.append(self.populate_time_slots(new_week, room_order))
        return populated_times_slots

    def update_calendar_weeks(self):
        date_two_weeks_ago = self.today + datetime.timedelta(days=-14)
        year = date_two_weeks_ago.year
        month = date_two_weeks_ago.month
        day = date_two_weeks_ago.day
        two_weeks_ago = self.get_week_int(year, month, day)
        if self.collection.find_one({"week": two_weeks_ago}):
            self.collection.delete_many({"week": two_weeks_ago})
            self.collection.insert_many(self.combine_lists(self.add_new_week_to_all_rooms()))
            print("Deleted all entries for week before last and added a new week with empty time slots")
        else:
            print("Calendar was up to date, no weeks added or removed")

    def create_admin_db(self, workplace_info: list):
        if workplace_info:
            self.users_collection.remove()
            for user in workplace_info:
                user["_id"] = int(workplace_info.index(user) + 1)
                self.users_collection.insert_one(user)
            print("Recreated users database")
        else:
            print("No input in list, did you accidentally delete work-info file?")

    """
    
        for user in workplace_info:
            if users_collection.find(
                {"$and":
                    [
                        {"company": user["company"]},
                        {"first_name": user["first_name"]},
                        {"last_name": user["last_name"]}
                    ]
                }
            ):
                pass
            else:
                users_collection.insert_many(workplace_info)
    
    days = datetime.timedelta(days=1)
    
    d = datetime.timedelta(days=2)
    a = time_now + d
    
    """
