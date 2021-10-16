################################################################################
# build
FROM node:16-alpine3.14 as build-stage
WORKDIR /app
RUN yarn global add @vue/cli
COPY package*.json yarn.lock ./
RUN yarn
COPY . .
#PLACEHOLDER
RUN yarn build

################################################################################
# deploy
FROM nginx:1.21.3-alpine
RUN apk update && apk add --no-cache bash vim
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
# nginx should already be running, so no need for command
