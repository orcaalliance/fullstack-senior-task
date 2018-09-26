FROM node:8.11.3
WORKDIR /usr/webapp    
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]
 


