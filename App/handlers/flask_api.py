from flask import jsonify, request
from flask_restful import Api, Resource
from pymongo import MongoClient
import handlers.api_tools as tools
from bson import json_util
import json

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock_data"]


def bookit_api(app):
    class NewBooking(Resource):
        def post(self):
            posted_data = request.get_json()
            print("GOT POSTED DATA")
            response = {
                "message": "Something unexpected happened",
                "status": 400
            }
            if tools.validate_request_keys_unordered(posted_data, tools.NEW_BOOKING):
                if tools.validate_request_keys_ordered(posted_data, tools.NEW_BOOKING):
                    mock_collection.insert(posted_data)
                    response["message"] = "OK"
                    response["status"] = 200
                else:
                    response["message"] = tools.REQUEST_KEYS_ORDERED_FALSE
            else:
                response["message"] = tools.REQUEST_KEYS_FALSE

            return jsonify(response)

    class AllBookings(Resource):
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
        def put(self, _id):
            mock_collection.update({"_id": _id}, {"$set": {"company": "", "booker": ""}})
            response = {
                "message": "Time slot is now empty",
                "status": 200
            }
            return response

    api = Api(app)
    api.add_resource(NewBooking, "/v1/new_booking")
    api.add_resource(AllBookings, "/v1/bookings")
    api.add_resource(RemoveBooking, "/v1/remove/<int:_id>")
