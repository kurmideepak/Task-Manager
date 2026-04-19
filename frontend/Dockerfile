# Stage 1: Build the React application
FROM node:22-alpine AS build
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the application
COPY . .
# Build the application (Vite outputs to /dist)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the built assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration for proxying properly
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
