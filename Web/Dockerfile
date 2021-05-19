FROM nginx:latest

COPY . .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80:80

RUN apt-get install curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt-get update

RUN apt-get install nodejs -y

COPY package.json .

RUN npm install

RUN npm run build --force

WORKDIR ./build/

COPY . /usr/share/nginx/www/
