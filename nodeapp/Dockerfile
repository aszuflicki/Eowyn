FROM node:10-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]