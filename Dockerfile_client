FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]

FROM node:18-alpine as PRODUCTION_IMAGE

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build