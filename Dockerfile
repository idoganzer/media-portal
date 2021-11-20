# pull official base image
FROM node:14.16.0-stretch
ENV NODE_VERSION 16.13.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
