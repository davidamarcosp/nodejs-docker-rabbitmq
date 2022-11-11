FROM node:16-alpine as publisher
WORKDIR /publisher
COPY package*.json ./

# Utility script for better container orchestration
RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

RUN npm install
COPY ./*.js ./
