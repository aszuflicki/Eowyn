FROM node:10-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]