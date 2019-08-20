FROM nginx:1.17.3-alpine
# WORKDIR /etc/nginx/
RUN rm -f nginx.conf
COPY nginx/. /etc/nginx/
EXPOSE 80 443