FROM node:20-alpine

WORKDIR /app

# cache-friendly deps layer
COPY package*.json ./
RUN npm install --ignore-scripts

# now copy the actual Quasar project
COPY . .

# run quasar prepare now that quasar.config + src exist
RUN npm run postinstall

EXPOSE 9000
CMD ["npm", "run", "dev"]
