FROM node:alpine
WORKDIR /app
RUN npm init -y && npm install express morgan
ADD polyfills ./polyfills
ADD detector ./detector
ADD reporting-service ./reporting-service
EXPOSE 8080
CMD ["node", "reporting-service/index.js"]