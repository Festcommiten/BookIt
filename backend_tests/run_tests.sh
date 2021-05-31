#!/bin/bash

# Paramater, docker-compose location
docker_compose_file=$1

# Checks if a paramater was passed
# If not, the script will use the local docker-compose file
if [ -z $docker_compose_file ]
then
  echo $'\n****** RUNNING DEAFULT DOCKER COMPOSE BUILD ******\n'
  docker_compose_file="docker-compose.yml"
else
  echo $'\n****** RUNNING GIVEN DOCKER COMPOSE BUILD ******\n'
# Else it uses the docker-compose file given by the user
fi
echo $'\n****** DOCKER COMPOSE BUILD ******\n'
docker-compose -f $docker_compose_file build

echo $'\n****** DOCKER COMPOSE UP ******\n'
docker-compose up -d

echo $'\n****** IMPORT MOCK DATA ******\n'
docker exec -i backend_tests_db_1 sh -c 'mongoimport -c mock_data -d test_db --drop --file mock_data.json --jsonArray'

echo $'\n****** RUNNING FLAKE8 ******\n'
docker exec -i backend_tests_app_1 sh -c 'flake8 --statistics'

echo $'\n****** RUNNING PYTEST ******\n'
docker exec -i backend_tests_app_1 sh -c 'pytest -vv -s'

echo $'\n***** DELETING MOCK DATA COLLECTION *****\n'
docker exec -i backend_tests_db_1 sh -c 'mongo test_db --eval "db.mock_data.drop()"'

echo $'\n****** DOCKER COMPOSE STOP ******\n'
docker-compose stop


# Which container we are executing code in are still hard coded, for now.
