# dockerfile
# the first image use node image as the builder because it has git program
FROM node as builder

WORKDIR /app

COPY ["./package.json", "package-lock.json", "/app/"]

RUN npm ci

COPY "./" "/app/"

## compile typescript
RUN npm run build

## remove packages of devDependencies
RUN npm prune --production

# ===============
# the second image use node:slim image as the runtime
FROM node:slim as runtime

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

## Copy the necessary files form builder
COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/bpmn/" "/app/bpmn/"
COPY --from=builder "/app/.env" "/app/.env"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["npm", "run", "start:prod"]