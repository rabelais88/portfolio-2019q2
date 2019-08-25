# stage - 1 dependencies
FROM node:12.8.1 as dependencies
RUN mkdir /root/api
COPY api/. /root/api/
COPY env_secrets_expand.sh /root/api/env_secrets_expand.sh
WORKDIR /root/api
RUN yarn install && yarn build

# stage 2 - final image
FROM node:12.8.1-alpine
RUN mkdir /root/api
COPY --from=dependencies /root/api/. /root/api/
WORKDIR /root/api
EXPOSE 3000:3000
EXPOSE 27017:27017