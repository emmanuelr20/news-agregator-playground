# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a smaller image for the final stage
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/publi[c] ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]