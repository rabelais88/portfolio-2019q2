FROM node:12.8.1-alpine
RUN mkdir /root/www-v2
COPY www-v2/. /root/www-v2/
WORKDIR /root/www-v2
RUN yarn install && yarn build
EXPOSE 3000:3000
CMD [ "yarn", "start" ]
