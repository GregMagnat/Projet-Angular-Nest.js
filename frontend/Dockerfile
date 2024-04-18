FROM node:20.12-alpine3.18


WORKDIR /src/app


COPY . .


RUN npm install -g @angular/cli


RUN npm install


CMD ["ng", "serve", "--host", "0.0.0.0"]