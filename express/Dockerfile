FROM node:14-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["npm", "start"]