# Build app
FROM node:lts-alpine3.17 as node
WORKDIR .
RUN ls /etc
RUN mkdir desktop
WORKDIR desktop
COPY . .
RUN npm i -g @angular/cli@15.0.4
RUN npm i
RUN ng build

# Deploy via nginx
FROM nginx:alpine
COPY --from=node /desktop/dist/receipt-wrangler /usr/share/nginx/html
COPY --from=node /desktop/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Super basic example. We need the ability to create a config based on passed in env variables
