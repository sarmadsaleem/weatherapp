# use base image of node:9-slim
FROM node:9-slim
# create app directory on container
WORKDIR /usr/src/app
# copy package.json & package-lock.json for app dependencies
COPY package*.json ./
# install dependencies, for production use RUN npm install --only=production
RUN npm install
# copy app source to container work directory
# COPY . .
# expose port Webpack dev server is listening on
EXPOSE 8000
# run following command after container provisioned
CMD [ "npm", "start" ]