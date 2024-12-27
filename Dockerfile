# Use the official Node.js image
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight web server for the production build
FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the production build from the builder
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package*.json /app/

# Install only production dependencies
RUN npm install --production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
