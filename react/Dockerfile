FROM node:alpine as builder
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
COPY index.js ./
CMD ["npm", "start"]