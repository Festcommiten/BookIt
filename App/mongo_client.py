from pymongo import MongoClient


def initiate_mongo_client(url: str) -> list:
    print("*** MONGO URL *** :", "mongodb://" + url + ":27017")
    client = MongoClient("mongodb://" + url + ":27017")
    db = client.test_db
    mock_collection = db["mock_data"]
    users_collection = db["users"]

    return [mock_collection, users_collection]
