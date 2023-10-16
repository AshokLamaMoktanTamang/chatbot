# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the root-level inside working directory
COPY . .

# Install dependencies for the entire monorepo
RUN yarn

# Expose the port
EXPOSE 3333
EXPOSE 3001

# Define the default command to run the Node.js application
CMD ["yarn", "start"]
