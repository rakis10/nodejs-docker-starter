# Use the official Node.js image as the base
FROM node:16.4.2

# Set the working directory inside the container
WORKDIR /app

COPY init.sql /app/init.sql

# Install sqlite3
# RUN apk add --no-cache sqlite

# TODO
# Run the SQL file against the database file (replace 'your_database.db' with your actual filename)
# RUN sqlite3 /db.sqlite < /app/init.sql

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start your Node.js app
CMD ["npm", "start"]
