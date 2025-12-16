FROM node:20-alpine

WORKDIR /app

# Copy only dependency manifests (cache-friendly)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]
