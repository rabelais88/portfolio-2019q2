FROM node:12.8.1-alpine
RUN mkdir /root/www-v2
COPY www-v2/. /root/www-v2/
WORKDIR /root/www-v2
RUN yarn install && yarn build
EXPOSE 4000:4000
CMD [ "yarn", "start" ]
