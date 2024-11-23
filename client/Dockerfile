FROM node:18-alpine as builder

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

