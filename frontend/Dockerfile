FROM node:latest

COPY ./frontend /usr/src/app

WORKDIR /usr/src/app
RUN npm install
RUN npm build

EXPOSE 3000

CMD npm start
