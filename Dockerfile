# ใช้ Node.js เป็น Base image สำหรับการสร้าง Image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# ตั้งค่า NODE_ENV เป็น production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# ทำการ build application
RUN npm run build

# รัน application ด้วยคำสั่ง npm start
CMD [ "npm", "start" ]