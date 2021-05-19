FROM nginx:latest

COPY . .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80:80

RUN sudo apt-get install curl

RUN sudo curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN sudo apt-get update

RUN sudo apt-get install nodejs -y

COPY package.json .

RUN sudo npm install

RUN sudo npm run build --force

WORKDIR ./build

COPY . /usr/share/nginx/www/
