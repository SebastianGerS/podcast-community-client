# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:11
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
# install dependencies
RUN yarn
# Copy the current directory contents into the container at /client
COPY . /client/
# declare a env variable that can be set from the docker-compose file
ENV PORT=3000
# Make the port available to the world outside this container
EXPOSE $PORT
# Run the app when the container launches
CMD ["yarn", "start"]