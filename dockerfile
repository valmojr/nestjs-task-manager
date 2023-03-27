FROM node:19
WORKDIR /dist
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["node", "src/index.js"]