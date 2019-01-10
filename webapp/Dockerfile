FROM node:10-alpine as builder

WORKDIR /usr/src/app

COPY package* ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80