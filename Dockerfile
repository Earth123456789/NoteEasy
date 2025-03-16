# Step 1: Use the official Node.js image as a base image
FROM node:18 AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Use a lighter image for serving the app (production image)
FROM node:18-slim

# Set the working directory in the new container
WORKDIR /app

# Copy the static files from the builder stage
COPY --from=builder /app/out ./out

# Install serve to serve the static site
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "out", "-l", "3000"]
