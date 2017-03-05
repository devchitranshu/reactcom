FROM nginx:1.11

RUN apt-get update && apt-get install -y vim

COPY ./conf/nginx.conf /etc/nginx/
COPY ./conf/default.conf /etc/nginx/conf.d/

WORKDIR /var/www/html

RUN usermod --non-unique --uid 1000 www-data

CMD chown -R www-data:www-data /var/www/html && /usr/sbin/nginx -g "daemon off;"
