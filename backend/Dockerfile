FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
#RUN npm install sqlite3 --save
#RUN npm install sequelize --save
RUN npm install axios
RUN npm install graph
RUN npm install mongoose
RUN npm install dijkstrajs
RUN npm install cors --save
CMD ["npm", "start"]
