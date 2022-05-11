FROM node:16
WORKDIR /app
COPY . /app
RUN npm install 
COPY . . 
EXPOSE 5000
CMD ["node","server.js"]