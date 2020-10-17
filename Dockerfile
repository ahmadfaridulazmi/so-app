FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/order-app

RUN apk add --no-cache git
RUN apk add --no-cache python
RUN apk add --no-cache make
RUN apk add --no-cache g++
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD ["npm" ,"run","start"]
