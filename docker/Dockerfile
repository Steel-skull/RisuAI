# Use Node.js 20 (LTS version) on Alpine
FROM node:20-alpine AS builder

# Set working directory
ARG ROOT=/RisuAI
WORKDIR ${ROOT}

# Install git and other necessary build tools
RUN apk add --no-cache git

# Add a dummy build argument to force the git clone step to run
ARG CACHEBUST=1

# Clone the repository (with --depth 1 to get only the latest commit)
ARG REPO_URL=https://github.com/kwaroran/RisuAI
RUN git clone --depth 1 ${REPO_URL} .

# Install dependencies
RUN npm install

# Update TypeScript configuration
RUN npm update @tsconfig/svelte

# Build the application
RUN npm run build

# Set the command to run the server
CMD ["npm", "run", "runserver"]
