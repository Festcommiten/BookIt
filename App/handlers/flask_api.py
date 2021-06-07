from flask import request, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
import handlers.CONSTANTS as C
from flask_cors import cross_origin

# import handlers.api_tools as tools

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock_data"]
users_collection = db["users"]


def db_find_one(key: str, value):
    return mock_collection.find_one({key: value})


def bookit_api(app):
    # EDIT BOOKINGS
    class NewBooking(Resource):
        @cross_origin()
        def put(self, id):
            posted_data = request.get_json()
            response = {
                "status": 0,
                "message": ""
            }
            company = posted_data["company"]
            booker = posted_data["booker"]
            if db_find_one("_id", id) is not None:
                mock_collection.update({"_id": id}, {"$set": {"company": company, "booker": booker}})
                response["message"] = "OK"
                response["status"] = 200
            else:
                response["message"] = C.ID_DOES_NOT_EXIST
                response["status"] = 400
            return jsonify(response)

    class RemoveBooking(Resource):
        @cross_origin()
        def put(self, id):
            response = {
                "message": "",
                "status": ""
            }
            if db_find_one("_id", id):
                mock_collection.update({"_id": id}, {"$set": {"company": "", "booker": ""}})
                response["message"] = "OK"
                response["status"] = 200
            else:
                response["message"] = C.ID_DOES_NOT_EXIST
                response["status"] = 400

            return jsonify(response)

    # GET BOOKINGS
    class Bookings(Resource):
        @cross_origin()
        def get(self):
            bookings = list(mock_collection.find())
            response = {
                "bookings": bookings,
                "message": "OK",
                "status": 200
            }
            return jsonify(response)

    class BookingsWeek(Resource):
        @cross_origin()
        def get(self, week):
            response = {
                "bookings": [],
                "message": "Bad request",
                "status": 400
            }
            bookings = list(mock_collection.find({"week": week}))
            if bookings:
                response["bookings"] = bookings
                response["message"] = "OK"
                response["status"] = 200
            else:
                response["bookings"] = C.NO_BOOKINGS_PARAMETERS
            return jsonify(response)

    class BookingsWeekRoom(Resource):
        @cross_origin()
        def get(self, week, room_name):
            response = {
                "bookings": [],
                "message": "Bad request",
                "status": 400
            }
            bookings = list(mock_collection.find({"$and": [{"week": week}, {"room": room_name}]}))
            if bookings:
                response["bookings"] = bookings
                response["message"] = "OK"
                response["status"] = 200
            else:
                response["bookings"] = C.NO_BOOKINGS_PARAMETERS
            return jsonify(response)

    # GET USERS
    class GetUsers(Resource):
        @cross_origin()
        def get(self):
            response = {
                "users": list(users_collection.find()),
                "message": "OK",
                "status": 200
            }
            return jsonify(response)

    # GET ROOMS
    class GetRooms(Resource):
        @cross_origin()
        def get(self):
            response = {
                "rooms": sorted(C.ROOM_NAMES_LIST),
                "message": "OK",
                "status": 200
            }
            return jsonify(response)

    # HELLO WORLD
    class HelloWorld(Resource):
        @cross_origin()
        def get(self):
            return "Hello World!"

    api = Api(app)
    # EDIT BOOKINGS
    api.add_resource(NewBooking, C.CURRENT_VERSION + "/new_booking/<int:id>")
    api.add_resource(RemoveBooking, C.CURRENT_VERSION + "/remove/<int:id>")
    # GET BOOKINGS
    api.add_resource(Bookings, C.CURRENT_VERSION + "/bookings")
    api.add_resource(BookingsWeek, C.CURRENT_VERSION + "/bookings/<int:week>")
    api.add_resource(BookingsWeekRoom, C.CURRENT_VERSION + "/bookings/<int:week>/<string:room_name>")
    # GET USERS
    api.add_resource(GetUsers, C.CURRENT_VERSION + "/users")
    # GET ROOMS
    api.add_resource(GetRooms, C.CURRENT_VERSION + "/rooms")
    # HELLO WORLD
    api.add_resource(HelloWorld, "/")
