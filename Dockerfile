FROM node:20-alpine

WORKDIR /app

# Copy whole project first so Quasar has context
COPY . .

# Install deps AFTER copying project
RUN npm install

EXPOSE 9000

CMD ["npm", "run", "dev"]
