FROM nikolaik/python-nodejs:latest

WORKDIR /workspace

COPY package*.json ./
RUN npm install
COPY . .
