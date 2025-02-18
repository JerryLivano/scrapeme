FROM node:18-alpine AS build

WORKDIR /app
COPY . .
COPY package*.json .
RUN yarn
RUN yarn build --mode staging

# -- RELEASE --
FROM nginx:stable-alpine AS release

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]