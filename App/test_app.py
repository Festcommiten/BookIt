from multiprocessing import Process
from flask import Flask
# from <API LOCATION> import <API>

app = Flask(__name__)
# <API>(app)
flask_app = Process(target=app.run)
url = "http://127.0.0.1:5000"


def setup_module(module):
    flask_app.start()


def teardown_module(module):
    flask_app.terminate()
    flask_app.join()

# WRITE UNIT TESTS BELOW THIS LINE
