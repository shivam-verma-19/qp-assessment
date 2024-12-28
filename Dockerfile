FROM node:18-alpine

WORKDIR /app

# Copy package.json and yarn.lock first to take advantage of Docker's cache
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application if necessary (ensure this step is required for your app)
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
