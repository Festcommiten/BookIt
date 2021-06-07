echo $'\n***** STARTING MONGO *****'
sudo systemctl start mongod.service
sleep 5 s

echo $'\n***** STARTING APPLICATION'
sudo systemctl start app.service
sleep 2 s

echo $'\n***** RUNNING FLAKE8 *****'
flake8 ../App/ --max-line-length 120

echo $'\n***** RUNNING PYTEST *****'
pytest ../App/ -v -s

echo $'\n***** DELETING MOCK DATA *****'
mongo test_db --eval "db.mock_data.drop()"

echo $'\n***** DELETING USERS DATA *****'
mongo test_db --eval "db.users.drop()"

