FROM node:10

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

RUN npm install react-scripts@latest -g 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]