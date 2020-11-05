FROM node:12.0-alpine

# Create app directory
WORKDIR /var/www/dompet-kilat

ENV PORT=3000
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY .env package.json package-lock.json* ./

RUN npm install -g nodemon sequelize-cli

RUN npm install && npm cache clean --force

# Bundle app source
COPY . .

# EXPOSE 8080
CMD [ "nodemon", "app.js" ]