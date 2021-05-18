from flask import jsonify, request
from flask_restful import Api, Resource
from pymongo import MongoClient
import handlers.api_tools as tools

# MONGO
client = MongoClient("mongodb://db:27017")
db = client.test_db
mock_collection = db["mock"]


def bookit_api(app):
    class NewBooking(Resource):
        def post(self):
            posted_data = request.get_json()
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

    api = Api(app)
    api.add_resource(NewBooking, "/v1/new_booking")
