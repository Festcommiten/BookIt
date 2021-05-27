from flask import Flask
from handlers.flask_api import bookit_api
# from app_data import app_leo

app = Flask(__name__)
bookit_api(app)
# app_leo(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
