FROM node:alpine
# This is the image we'll use as the base

WORKDIR /usr/src/app
# Create app directory

ENV EXPRESS_ENV docker
ENV DB_ENDPOINT pru-app-db-container
ENV DB_USER postgres
ENV DB_PASS docker
ENV DB_NAME customer_db
# Setting DB ENV variables

COPY . .
# Copy the app to the directory

RUN npm install
# Install dependencies

EXPOSE 3001
# The port we want the container to open (i.e. run on)

CMD [ "npm", "run", "start" ]
# The command to start the server inside the container   