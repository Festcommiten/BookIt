# App

### If app.py is going to run in a production enviornment, simply run the file with Python3.8 (Flask has a bug with Python3.9.+ so it has to be executed with a version less than 3.9)
#### However, if the application is going to be running in a Docker container parallel with a MongoDB container, use the "-test" flag. Example: `python3 app.py -test` (This is for testing purposes since the application will be running on the servers natively without VMs or containers)

