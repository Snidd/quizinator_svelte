#Dockerfile

# Use this image as the platform to build the app
FROM node:20-alpine AS quizinator
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# A small line inside the image to show who made it
LABEL Developers="Snidd"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy all local files into the image
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", "build"]