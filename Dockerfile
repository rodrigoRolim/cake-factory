FROM node:alpine

WORKDIR /app
COPY ./package.json .
COPY ./gulpfile.js .
COPY ./init-mongo.js .

RUN npm install
CMD ["npm run build", "npm run start"]
