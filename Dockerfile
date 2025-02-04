# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application files
COPY . .

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]