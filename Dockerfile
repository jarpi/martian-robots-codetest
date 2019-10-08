FROM node:10.0.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

ENV PORT 8080

ENV NODE_ENV PRODUCTION

EXPOSE 8080

CMD [ "npm", "start" ]