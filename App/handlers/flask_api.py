from flask import request, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
import handlers.api_tools as tools
import handlers.CONSTANTS as C
from flask_cors import cross_origin

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock_data"]
users_collection = db["users"]


def db_find_one(key: str, value):
    return mock_collection.find_one({key: value})


def bookit_api(app):
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
            return response

    class AllBookings(Resource):
        @cross_origin()
        def get(self):
            response = {
                "bookings": [],
                "message": "Something unexpected happened",
                "status": 400
            }
            try:
                # all_bookings = json_util.dumps(mock_collection.find())
                all_bookings = list(mock_collection.find())
                # all_bookings_json = json.dumps(all_bookings, default=json_util.default)
                response["bookings"] = all_bookings
                response["message"] = "OK"
                response["status"] = 200
                return response
            except Exception as e:
                response["message"] = e
                return response

    class RemoveBooking(Resource):
        @cross_origin()
        def put(self, id_number: int):
            response = {
                "message": "",
                "status": ""
            }
            _id = tools.str_to_int(id_number)
            if _id:
                if db_find_one("_id", _id):
                    mock_collection.update({"_id": _id}, {"$set": {"company": "", "booker": ""}})
                    response["message"] = C.SLOT_IS_EMPTY
                    response["status"] = 200
                    return response
                else:
                    response["message"] = C.ID_DOES_NOT_EXIST
                    response["status"] = 400
                    return response
            else:
                response["message"] = "'" + C.WRONG_ID_DATATYPE + "' " + C.STR_TO_INT_ERROR
                response["status"] = 400
                return response

    class GetBookings(Resource):
        @cross_origin()
        def get(self, week, room_name):
            bookings = list(mock_collection.find({"$and": [{"week": week}, {"room": room_name}]}))
            return jsonify(bookings)


    class GetUsers(Resource):
        @cross_origin()
        def get(self):
            users = list(users_collection.find())
            return jsonify(users)

    class HelloWorld(Resource):
        @cross_origin()
        def get(self):
            return "Hello World!"

    api = Api(app)
    api.add_resource(NewBooking, C.CURRENT_VERSION + "/new_booking/<int:id>")
    api.add_resource(AllBookings, C.CURRENT_VERSION + "/all_bookings")
    api.add_resource(RemoveBooking, C.CURRENT_VERSION + "/remove/<id_number>")
    api.add_resource(GetBookings, C.CURRENT_VERSION + "/bookings/<int:week>/<string:room_name>")
    api.add_resource(GetUsers, C.CURRENT_VERSION + "/users")
    api.add_resource(HelloWorld, "/")
