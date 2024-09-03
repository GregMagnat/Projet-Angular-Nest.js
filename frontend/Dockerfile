FROM node:20.12-alpine3.18 as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:container"]