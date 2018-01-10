FROM node:alpine
RUN mkdir /app
WORKDIR /app
RUN npm install express
ADD polyfills ./polyfills
ADD detector ./detector
ADD reporting-service ./reporting-service
EXPOSE 8080
CMD ["node", "reporting-service/index.js"]