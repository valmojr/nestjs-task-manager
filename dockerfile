FROM node

ENV DATABASE_URL mongodb://localhost:27017/collabore

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]