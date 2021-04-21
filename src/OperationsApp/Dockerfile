FROM node:12.18-alpine as build-step
WORKDIR /app/src
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build --prod

#nginx
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/src/dist/OperationsApp /usr/share/nginx/html
