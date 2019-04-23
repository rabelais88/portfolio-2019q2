# Use a Node.js image and assign it as our build
FROM mhart/alpine-node:10

# Set the working directory, copy dependency management files to the working directory,
# and install the dependencies
RUN npm config set unsafe-perm true
RUN npm i -g yarn

WORKDIR /usr/src/app
# Copy all files to the working directly, build the application
# and purge the development dependencies
COPY . .
RUN yarn install
RUN yarn build && yarn --production

# Copy files from the base image over to our new image's working directory

EXPOSE 3000

# Start the server for Next.js using Node.js
CMD ["yarn", "start"]