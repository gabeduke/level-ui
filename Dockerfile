# Use a base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the project files into the Docker image
COPY . .

# Install dependencies
RUN yarn install

# Expose the port the app runs on
EXPOSE 8080

# Set the command to run the server
CMD ["yarn", "serve"]
