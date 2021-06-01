FROM nginx:latest

COPY . /usr/share/nginx/www/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN apt-get install curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt-get update

RUN apt-get install nodejs -y

COPY package.json .

WORKDIR /usr/share/nginx/www/

RUN npm install

RUN npm run build --force
